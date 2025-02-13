import { boolean, number, object, string } from 'zod';
import type { z } from 'zod';

const nameMinLength = 1;
const nameMaxLength = 40;

export const userSchemaFields = {
  _id: string(),
  orgId: string(),
  email: string(),
  password: string().optional().nullable(),
  name: string().min(nameMinLength).max(nameMaxLength).optional().nullable(),
  isGoogleSignIn: boolean().default(false),
  isVerified: boolean().default(false),
  createdAt: number(),
  updatedAt: number(),
};

export const userSchema = object(userSchemaFields);
export type User = z.infer<typeof userSchema>;
