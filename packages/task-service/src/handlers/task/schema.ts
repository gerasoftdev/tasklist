import { number, object } from 'zod';
import type { z } from 'zod';
import {
  booleanFiltersSchema,
  sortMethodSchema,
  stringFiltersSchema,
  taskSchema,
} from '@repo/validation-schema';

export const getTaskByIdArgsSchema = taskSchema
  .partial()
  .pick({
    _id: true,
    orgId: true,
  })
  .required({
    _id: true,
  });
export type GetTaskByIdArgs = z.infer<typeof getTaskByIdArgsSchema>;

export const getTasksArgsSchema = object({
  filters: object({
    _id: stringFiltersSchema.optional(),
    orgId: stringFiltersSchema.optional(),
    name: stringFiltersSchema.optional(),
    isCompleted: booleanFiltersSchema.optional(),
    taskListId: stringFiltersSchema.optional(),
  }).optional(),
  sortBy: object({
    name: sortMethodSchema.optional(),
    isCompleted: sortMethodSchema.optional(),
    taskListId: sortMethodSchema.optional(),
    createdAt: sortMethodSchema.optional(),
    updatedAt: sortMethodSchema.optional(),
  }).optional(),
  limit: number().optional(),
  offset: number().optional(),
}).default({});
export type GetTasksArgs = z.infer<typeof getTasksArgsSchema>;

export const createTaskArgsSchema = taskSchema
  .omit({
    createdAt: true,
    updatedAt: true,
    completedAt: true,
  })
  .partial({
    _id: true,
    isCompleted: true,
  });
export type CreateTaskArgs = z.infer<typeof createTaskArgsSchema>;

export const updateTaskArgsSchema = taskSchema
  .partial()
  .omit({
    createdAt: true,
    updatedAt: true,
    completedAt: true,
  })
  .required({
    _id: true,
  });
export type UpdateTaskArgs = z.infer<typeof updateTaskArgsSchema>;

export const deleteTaskArgsSchema = taskSchema
  .partial()
  .pick({
    _id: true,
    orgId: true,
  })
  .required({
    _id: true,
  });
export type DeleteTaskArgs = z.infer<typeof deleteTaskArgsSchema>;
