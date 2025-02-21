import type { z } from 'zod';
import { boolean, number, object, string } from 'zod';

export const taskNameMinLength = 1;
export const taskNameMaxLength = 40;

export const taskSchemaFields = {
  _id: string(),
  orgId: string(),
  name: string().min(taskNameMinLength).max(taskNameMaxLength),
  isCompleted: boolean().default(false),
  completedAt: number().nullable().optional(),
  createdAt: number(),
  updatedAt: number(),
};

export const taskSchema = object(taskSchemaFields);
export type Task = z.infer<typeof taskSchema>;
