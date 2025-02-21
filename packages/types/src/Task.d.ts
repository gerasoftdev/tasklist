export type { Task } from '@repo/validation-schema';
import type { Task } from '@repo/validation-schema';

export type MockTaskType = Pick<Task, '_id' | 'name' | 'isCompleted'>;
