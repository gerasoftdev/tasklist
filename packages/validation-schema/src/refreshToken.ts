import { number, object, string } from 'zod';
import type { z } from 'zod';

export const refreshTokenSchemaFields = {
  _id: string(),
  orgId: string(),
  userId: string(),
  expiresAt: number(),
  createdAt: number(),
  updatedAt: number(),
};

export const refreshTokenSchema = object(refreshTokenSchemaFields);
export type RefreshToken = z.infer<typeof refreshTokenSchema>;
