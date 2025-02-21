import type { Task } from '@repo/types';

const orgId = 'org';

export const mockTask1: Task = {
  _id: 'task1',
  orgId,
  name: 'task1',
  isCompleted: false,
  createdAt: 1,
  updatedAt: 1,
};

export const mockTask2: Task = {
  _id: 'task2',
  orgId,
  name: 'task2',
  isCompleted: false,
  createdAt: 1,
  updatedAt: 1,
};
