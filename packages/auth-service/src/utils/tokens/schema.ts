import { type z } from 'zod';
import { userSchema } from '@repo/validation-schema';

export const createTokensArgsSchema = userSchema
  .partial()
  .pick({
    _id: true,
    orgId: true,
    email: true,
  })
  .required({
    _id: true,
    orgId: true,
    email: true,
  });
export type CreateTokensArgs = z.infer<typeof createTokensArgsSchema>;
