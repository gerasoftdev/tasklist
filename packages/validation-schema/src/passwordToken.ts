import { number, object, string } from 'zod';
import type { z } from 'zod';

export const passwordTokenSchemaFields = {
  _id: string(),
  userId: string(),
  expiresAt: number(),
  createdAt: number(),
  updatedAt: number(),
};

export const passwordTokenSchema = object(passwordTokenSchemaFields);
export type PasswordToken = z.infer<typeof passwordTokenSchema>;
