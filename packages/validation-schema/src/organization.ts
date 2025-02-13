import { number, object, string } from 'zod';
import type { z } from 'zod';

const nameMinLength = 1;
const nameMaxLength = 40;

export const organizationSchemaFields = {
  _id: string(),
  name: string().min(nameMinLength).max(nameMaxLength).optional().nullable(),
  createdAt: number(),
  updatedAt: number(),
};

export const organizationSchema = object(organizationSchemaFields);
export type Organization = z.infer<typeof organizationSchema>;
