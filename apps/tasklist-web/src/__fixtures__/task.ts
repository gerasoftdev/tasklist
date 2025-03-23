export const mockTaskId = 'testTask1';
export const mockTaskName = 'Task 1';
export const mockTask = {
  __typename: 'Task',
  _id: mockTaskId,
  name: mockTaskName,
  isCompleted: false,
};
export const updatedTaskName = 'Edited Task';

export const mockNameUpdatedTask = {
  ...mockTask,
  name: updatedTaskName,
  isCompleted: false,
  updatedAt: 1,
};

export const mockTask2Id = 'testTask2';
export const mockTask2Name = 'Task 2';
export const mockTask2 = {
  __typename: 'Task',
  _id: mockTask2Id,
  name: mockTask2Name,
  isCompleted: false,
};
