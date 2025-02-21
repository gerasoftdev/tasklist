import type { MockTaskType } from '@repo/types';

export const mockTaskId = 'testTask1';
export const mockTaskName = 'Task 1';
export const mockTask: MockTaskType = {
  _id: mockTaskId,
  name: mockTaskName,
  isCompleted: false,
};
export const updatedTaskName = 'Edited Task';

export const mockTask2Id = 'testTask2';
export const mockTask2Name = 'Task 2';
export const mockTask2: MockTaskType = {
  _id: mockTask2Id,
  name: mockTask2Name,
  isCompleted: false,
};
