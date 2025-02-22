import type { FastifyInstance } from 'fastify';
import errors from '@repo/translation/en/errors.json';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { mockTask1 } from '@repo/task-service';
import type {
  CreateTaskMutation,
  DeleteTaskMutation,
  GetTaskQuery,
  GetTasksQuery,
  MutationCreateTaskArgs,
  MutationDeleteTaskArgs,
  MutationUpdateTaskArgs,
  QueryGetTaskByIdArgs,
  QueryGetTasksArgs,
  UpdateTaskMutation,
} from '@repo/graphql';
import {
  CreateTask,
  DeleteTask,
  GetTask,
  GetTasks,
  SortMethod,
  TaskSortField,
  UpdateTask,
} from '@repo/graphql';
import { print } from 'graphql';
import { mockUser } from '@repo/auth-service';
import { startTestServer } from '@/utils/test/server';
import { graphqlRoutes } from '@/routes/graphql';
import { authPlugin } from '@/plugins/auth';
import * as getUser from '@/utils/getUser';
import { authorizedHeaders } from '@/__fixtures__/auth';

const getUserMock = vi.fn().mockReturnValue(mockUser);

const getTaskByIdMock = vi.fn();
const getTasksMock = vi.fn();
const createTaskMock = vi.fn();
const updateTaskMock = vi.fn();
const deleteTaskMock = vi.fn();
const getTaskListByIdMock = vi.fn();
const getTaskListsMock = vi.fn();
const createTaskListMock = vi.fn();
const updateTaskListMock = vi.fn();
const deleteTaskListMock = vi.fn();

describe('Task resolver', () => {
  let server: FastifyInstance;

  vi.mock('@/graphql/context', () => ({
    contextFunction: () => (request: any) => {
      return {
        request,
        taskService: {
          getTaskById: getTaskByIdMock,
          getTasks: getTasksMock,
          createTask: createTaskMock,
          updateTask: updateTaskMock,
          deleteTask: deleteTaskMock,
          getTaskListById: getTaskListByIdMock,
          getTaskLists: getTaskListsMock,
          createTaskList: createTaskListMock,
          updateTaskList: updateTaskListMock,
          deleteTaskList: deleteTaskListMock,
        },
      };
    },
  }));

  beforeEach(() => {
    vi.spyOn(getUser, 'getUser').mockImplementation(getUserMock);
    getUserMock.mockReturnValue(mockUser);
  });

  beforeAll(async () => {
    server = await startTestServer();

    await server.register(authPlugin);
    await server.register(graphqlRoutes);

    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('getTaskById', () => {
    getTaskByIdMock.mockReturnValue(mockTask1);

    const variables: QueryGetTaskByIdArgs = {
      _id: mockTask1._id,
    };
    const body = {
      query: print(GetTask),
      variables,
    };

    it('Should get task with task list if user is authenticated', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
        headers: authorizedHeaders,
      });

      expect(getTaskByIdMock).toBeCalledWith(variables);

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      const result = response.json();
      expect(result.data).toMatchObject<GetTaskQuery>({
        getTaskById: {
          _id: mockTask1._id,
          name: mockTask1.name,
        },
      });
    });
    it('Should throw error if user is not authenticated', async () => {
      getUserMock.mockReturnValue(null);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(getTaskByIdMock).not.toBeCalled();

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      const result = response.json();
      expect(result.errors[0].message).toBe(errors.unauthorized);
    });
  });

  describe('getTasks', () => {
    const variables: QueryGetTasksArgs = {
      filters: { _id: { eq: mockTask1._id } },
      sortBy: [{ field: TaskSortField.createdAt, method: SortMethod.asc }],
      limit: 1,
      offset: 0,
    };
    const body = {
      query: print(GetTasks),
      variables,
    };
    it('Should get tasks if user is authenticated', async () => {
      getTasksMock.mockReturnValue([mockTask1]);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
        headers: authorizedHeaders,
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      expect(getTasksMock).toBeCalledWith({
        ...variables,
        filters: {
          ...variables.filters,
          orgId: { eq: mockUser.orgId },
        },
        sortBy: {
          createdAt: 'asc',
        },
      });

      const result = response.json();
      expect(result.data).toMatchObject({
        getTasks: {
          data: [
            {
              _id: mockTask1._id,
              name: mockTask1.name,
              isCompleted: mockTask1.isCompleted,
            },
          ],
          offset: variables.offset,
          limit: variables.limit,
        },
      } as GetTasksQuery);
    });
    it('Should throw error if user is not authenticated', async () => {
      getUserMock.mockReturnValue(null);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(getTasksMock).not.toBeCalled();

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      const result = response.json();
      expect(result.errors[0].message).toBe(errors.unauthorized);
    });
  });

  describe('createTask', () => {
    const variables: MutationCreateTaskArgs = {
      data: {
        _id: mockTask1._id,
        name: mockTask1.name,
      },
    };
    const body = {
      query: print(CreateTask),
      variables,
    };
    it('Should create task if user is authenticated', async () => {
      createTaskMock.mockReturnValue(mockTask1);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
        headers: authorizedHeaders,
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      expect(createTaskMock).toBeCalledWith({
        ...variables.data,
        orgId: mockTask1.orgId,
      });

      const result = response.json();
      expect(result.data).toMatchObject({
        createTask: {
          _id: mockTask1._id,
        },
      } as CreateTaskMutation);
    });
    it('Should throw error if user is not authenticated', async () => {
      getUserMock.mockReturnValue(null);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(createTaskMock).not.toBeCalled();

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      const result = response.json();
      expect(result.errors[0].message).toBe(errors.unauthorized);
    });
  });
  describe('updateTask', () => {
    const updatedMockTask = {
      ...mockTask1,
      name: 'changed',
    };
    const variables: MutationUpdateTaskArgs = {
      data: {
        _id: updatedMockTask._id,
        name: updatedMockTask.name,
      },
    };
    const body = {
      query: print(UpdateTask),
      variables,
    };
    it('Should update task if user is authenticated', async () => {
      updateTaskMock.mockReturnValue(updatedMockTask);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
        headers: authorizedHeaders,
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      expect(updateTaskMock).toBeCalledWith({
        ...variables.data,
        orgId: updatedMockTask.orgId,
      });

      const result = response.json();
      expect(result.data).toMatchObject({
        updateTask: {
          _id: updatedMockTask._id,
        },
      } as UpdateTaskMutation);
    });
    it('Should throw error if user is not authenticated', async () => {
      getUserMock.mockReturnValue(null);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(updateTaskMock).not.toBeCalled();

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      const result = response.json();
      expect(result.errors[0].message).toBe(errors.unauthorized);
    });
  });
  describe('deleteTask', () => {
    const variables: MutationDeleteTaskArgs = {
      data: {
        _id: mockTask1._id,
      },
    };
    const body = {
      query: print(DeleteTask),
      variables,
    };
    it('Should delete task if user is authenticated', async () => {
      deleteTaskMock.mockReturnValue(true);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
        headers: authorizedHeaders,
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      expect(deleteTaskMock).toBeCalledWith({
        ...variables.data,
        orgId: mockTask1.orgId,
      });

      const result = response.json();
      expect(result.data).toMatchObject({
        deleteTask: true,
      } as DeleteTaskMutation);
    });
    it('Should throw error if user is not authenticated', async () => {
      getUserMock.mockReturnValue(null);

      const response = await server.inject({
        method: 'POST',
        url: '/',
        body,
      });

      expect(deleteTaskMock).not.toBeCalled();

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);

      const result = response.json();
      expect(result.errors[0].message).toBe(errors.unauthorized);
    });
  });
});
