import type { Mock } from 'vitest';
import { describe, it, expect, vi } from 'vitest';
import * as aws from '@aws-sdk/client-ses';
import { createTransport } from 'nodemailer';
import { commsServiceFactory } from '.';

vi.mock('@aws-sdk/client-ses', () => ({
  SESClient: vi.fn(),
}));
vi.mock('nodemailer', () => ({
  createTransport: vi.fn(() => ({ mockTransporter: true })),
}));

const mockSendEmailArgs = {
  email: 'email@example.com',
  url: 'https://example.com',
};

describe('commsServiceFactory', () => {
  const mockConfig = {
    NODE_ENV: 'development',
    AWS_REGION: 'us-east-1',
    EMAIL_DOMAIN: 'example.com',
  };

  it('should return mock functions in non-production environments', async () => {
    const service = await commsServiceFactory(mockConfig);

    expect(service).toBeDefined();
    expect(service.sendPasswordResetEmail).toBeInstanceOf(Function);
    expect(service.sendVerificationEmail).toBeInstanceOf(Function);

    const passwordResetResult =
      await service.sendPasswordResetEmail(mockSendEmailArgs);
    const verificationResult =
      await service.sendVerificationEmail(mockSendEmailArgs);

    expect(passwordResetResult).toBe(true);
    expect(verificationResult).toBe(true);
  });

  it('should configure AWS SES and nodemailer in production environment', async () => {
    const productionConfig = {
      ...mockConfig,
      NODE_ENV: 'production',
    };

    const mockSESClientInstance = { mockSES: true };
    (aws.SESClient as unknown as Mock).mockImplementation(
      () => mockSESClientInstance,
    );

    const service = await commsServiceFactory(productionConfig);

    expect(aws.SESClient).toHaveBeenCalledWith({
      region: productionConfig.AWS_REGION,
    });
    expect(createTransport).toHaveBeenCalledWith({
      SES: { ses: mockSESClientInstance, aws },
    });

    expect(service).toBeDefined();
    expect(service.sendPasswordResetEmail).toBeDefined();
    expect(service.sendVerificationEmail).toBeDefined();
  });
});
