import { object, string } from 'zod';

export const sendVerificationEmailArgsSchema = object({
  email: string(),
  url: string(),
});

export const sendPasswordResetEmailArgsSchema = object({
  email: string(),
  url: string(),
});
