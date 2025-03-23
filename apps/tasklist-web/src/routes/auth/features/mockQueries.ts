import type {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  GetTaskQuery,
  GetTaskQueryVariables,
  GetTasksQuery,
  GetTasksQueryVariables,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from '@repo/graphql';
import {
  CreateTask,
  DeleteTask,
  GetTask,
  GetTasks,
  UpdateTask,
} from '@repo/graphql';
import { mockQuery } from '@/utils/testUtils';
import {
  mockNameUpdatedTask,
  mockTask,
  updatedTaskName,
} from '@/__fixtures__/task';

export const createTaskMutation = mockQuery<
  CreateTaskMutation,
  CreateTaskMutationVariables
>(CreateTask, {
  variables: {
    data: {
      name: mockTask.name,
    },
  },
  result: { createTask: { _id: mockTask._id } },
  withLoading: true,
});

export const deleteTaskMutation = mockQuery<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>(DeleteTask, {
  variables: {
    data: { _id: mockTask._id },
  },
  result: {
    deleteTask: true,
  },
  withLoading: true,
});

export const getTaskQuery = mockQuery<GetTaskQuery, GetTaskQueryVariables>(
  GetTask,
  {
    variables: { _id: mockTask._id },
    result: {
      getTaskById: mockTask,
    },
  },
);

export const updateTaskNameMutation = mockQuery<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>(UpdateTask, {
  variables: {
    data: {
      _id: mockTask._id,
      name: updatedTaskName,
    },
  },
  result: {
    updateTask: mockNameUpdatedTask,
  },
});

export const getTasksQuery = mockQuery<GetTasksQuery, GetTasksQueryVariables>(
  GetTasks,
  {
    result: {
      getTasks: {
        data: [mockTask],
        limit: 25,
        offset: 0,
      },
    },
  },
);

export const updateTaskCompletedMutation = (isCompleted: boolean) =>
  mockQuery<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTask)({
    withLoading: true,
    variables: {
      data: {
        _id: mockTask._id,
        isCompleted,
      },
    },
    result: {
      updateTask: { ...mockTask, updatedAt: 1, isCompleted },
    },
  });
