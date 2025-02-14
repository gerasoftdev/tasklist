import { object, string } from 'zod';
import { passwordSchema, userSchema } from '@repo/validation-schema';

export const createVerificationTokenArgsSchema = userSchema
  .partial()
  .pick({
    orgId: true,
    email: true,
  })
  .required({
    email: true,
  });

export const verifyUserArgsSchema = object({
  verificationTokenId: string(),
});

export const setPasswordArgsSchema = object({
  passwordTokenId: string(),
  password: passwordSchema,
});

export const verifyPasswordTokenArgsSchema = object({
  passwordTokenId: string(),
});

export const resetPasswordArgsSchema = object({
  email: string(),
});
export const signInArgsSchema = object({
  email: string(),
  password: string(),
});

export const refreshTokensArgsSchema = object({
  refreshToken: string(),
});
