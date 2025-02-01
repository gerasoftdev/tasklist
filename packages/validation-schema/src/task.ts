import type { z } from 'zod';
import { boolean, object, string } from 'zod';

export const taskNameMinLength = 1;
export const taskNameMaxLength = 40;

export const taskSchemaFields = {
  _id: string(),
  name: string().min(taskNameMinLength).max(taskNameMaxLength),
  isCompleted: boolean().default(false),
};

export const taskSchema = object(taskSchemaFields);
export type Task = z.infer<typeof taskSchema>;
