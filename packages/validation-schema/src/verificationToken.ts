import { number, object, string } from 'zod';
import type { z } from 'zod';

export const verificationTokenSchemaFields = {
  _id: string(),
  orgId: string().optional().nullable(),
  email: string().email(),
  expiresAt: number(),
  createdAt: number(),
  updatedAt: number(),
};

export const verificationTokenSchema = object(verificationTokenSchemaFields);
export type VerificationToken = z.infer<typeof verificationTokenSchema>;
