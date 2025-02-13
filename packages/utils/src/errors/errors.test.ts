import { describe, it, expect } from 'vitest';
import { GeneralError, AuthError } from '.';
import errors from '@repo/translation/en/errors.json';

describe('GeneralError', () => {
  it('should create a GeneralError with default properties', () => {
    const error = new GeneralError('verificationTokenInvalid');
    expect(error.message).toBe(errors.verificationTokenInvalid);
    expect(error.statusCode).toBe(500);
    expect(error.extensions.code).toBe('verificationTokenInvalid');
    expect(error.extensions.doLogout).toBe(true);
    expect(error.extensions.id).toBeDefined();
    expect(error.extensions.isHandled).toBe(true);
  });

  it('should allow overriding the message', () => {
    const customMessage = 'Custom error message';
    const error = new GeneralError('verificationTokenInvalid', {
      message: customMessage,
    });
    expect(error.message).toBe(customMessage);
  });

  it('should allow setting a custom statusCode', () => {
    const error = new GeneralError('verificationTokenInvalid', {
      statusCode: 400,
    });
    expect(error.statusCode).toBe(400);
  });

  it('should handle default extensions correctly', () => {
    const error = new GeneralError('refreshTokenInvalid');
    expect(error.extensions.doLogout).toBe(true);
    expect(error.extensions.code).toBe('refreshTokenInvalid');
  });

  it('should assign a unique ID to extensions', () => {
    const error1 = new GeneralError('verificationTokenInvalid');
    const error2 = new GeneralError('verificationTokenInvalid');
    expect(error1.extensions.id).not.toBe(error2.extensions.id);
  });

  it('should use statusCode from errorProps if defined', () => {
    const error = new GeneralError('refreshTokenInvalid');
    expect(error.statusCode).toBe(401);
  });
});

describe('AuthError', () => {
  it('should create an AuthError with default properties', () => {
    const error = new AuthError();
    expect(error.message).toBe(errors.unauthorized);
    expect(error.statusCode).toBe(401);
    expect(error.extensions.code).toBe('unauthorized');
    expect(error.extensions.doLogout).toBe(true);
    expect(error.extensions.id).toBeDefined();
    expect(error.extensions.isHandled).toBe(true);
  });

  it('should allow overriding the code and properties', () => {
    const error = new AuthError('passwordTokenInvalid', { statusCode: 403 });
    expect(error.message).toBe(errors.passwordTokenInvalid);
    expect(error.statusCode).toBe(403);
    expect(error.extensions.code).toBe('passwordTokenInvalid');
    expect(error.extensions.doLogout).toBe(true);
  });

  it('should default doLogout to true', () => {
    const error = new AuthError('verificationTokenInvalid');
    expect(error.extensions.doLogout).toBe(true);
  });
});
