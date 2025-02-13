import { string } from 'zod';

export const passwordSchema = string()
  .min(8)
  .max(40)
  .refine((password) => /[A-Z]/.test(password), {
    params: { i18n: 'requiredUppercase' },
  })
  .refine((password) => /[a-z]/.test(password), {
    params: { i18n: 'requiredLowercase' },
  })
  .refine((password) => /[0-9]/.test(password), {
    params: { i18n: 'requiredNumber' },
  });
