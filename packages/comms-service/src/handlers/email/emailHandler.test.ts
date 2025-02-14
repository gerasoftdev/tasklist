import { describe, it, expect, vi } from 'vitest';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '@/handlers/email';
import { EmailUserNames } from '../../constants/emailUserNames';

const mockSendMail = vi.fn().mockResolvedValue('Email sent');

const mockTransporter = {
  sendMail: mockSendMail,
};
const handlerProps = {
  transporter: mockTransporter as any,
  emailDomain: 'example.com',
};

describe('sendVerificationEmail', () => {
  it('should send a verification email with the correct content', async () => {
    const emailArgs = {
      email: 'user@example.com',
      url: 'https://example.com/verify',
    };

    await sendVerificationEmail(handlerProps)(emailArgs);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: `${EmailUserNames.noreply}@example.com`,
      to: 'user@example.com',
      subject: 'Verify your account',
      html: expect.any(String),
    });

    expect(mockSendMail.mock.calls[0][0].html).toContain('<h2>Welcome!</h2>');
    expect(mockSendMail.mock.calls[0][0].html).toContain(
      "<a class='btn btn-primary' target='_blank' href='https://example.com/verify'>Verify account</a>",
    );
  });
});

describe('sendPasswordResetEmail', () => {
  it('should send a password reset email with the correct content', async () => {
    const emailArgs = {
      email: 'user@example.com',
      url: 'https://example.com/reset-password',
    };

    await sendPasswordResetEmail(handlerProps)(emailArgs);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: `${EmailUserNames.noreply}@example.com`,
      to: 'user@example.com',
      subject: 'Reset your password',
      html: expect.any(String),
    });

    expect(mockSendMail.mock.calls[0][0].html).toContain(
      '<h2>Password reset</h2>',
    );
    expect(mockSendMail.mock.calls[0][0].html).toContain(
      "<a class='btn btn-primary' target='_blank' href='https://example.com/reset-password'>Reset password</a>",
    );
  });
});
