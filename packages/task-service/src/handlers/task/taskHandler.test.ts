import type { Task } from '@repo/types';
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  it,
  vi,
  expect,
} from 'vitest';
import type { Model } from 'mongoose';
import mongoose from 'mongoose';
import { createTaskModel } from '@/models';
import type { MongoDbTestEnvironment } from '@/utils/test/db';
import { connectToDb, disconnectFromDb, resetDb } from '@/utils/test/db';
import { mockTask1, mockTask2 } from '@/__fixtures__/task';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '@/handlers/task/handler';

describe('Task handler', () => {
  let testEnv: MongoDbTestEnvironment;
  let TaskModel: Model<Task>;

  const time = 2;

  beforeAll(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(1);

    testEnv = await connectToDb();

    TaskModel = createTaskModel({
      connection: mongoose.connection,
    });
  });

  beforeEach(async () => {
    await resetDb();

    vi.setSystemTime(1);
    await TaskModel.create([mockTask1]);
    vi.setSystemTime(time);
  });

  afterAll(async () => {
    await disconnectFromDb(testEnv);
  });

  describe('getTaskById', () => {
    it('Gets a task by id', async () => {
      const result = await getTaskById({ TaskModel })({
        _id: mockTask1._id,
      });
      expect(result).toMatchObject(mockTask1);
    });
    it('Returns null if not found', async () => {
      const result = await getTaskById({ TaskModel })({
        _id: 'non-existent',
      });
      expect(result).toBe(null);
    });
    it('Throws error if args are not valid', async () => {
      await expect(async () =>
        getTaskById({ TaskModel })({} as any),
      ).rejects.toThrow();
    });
  });

  describe('getTasks', () => {
    beforeEach(async () => {
      vi.setSystemTime(1);

      await TaskModel.create([mockTask2]);
      vi.setSystemTime(2);
    });

    it('Gets all tasks if no args supplied', async () => {
      const result = await getTasks({ TaskModel })({});
      expect(result).toMatchObject([mockTask1, mockTask2]);
    });
    it('Gets tasks meeting filtering requirements', async () => {
      const result = await getTasks({ TaskModel })({
        filters: {
          name: { eq: mockTask1.name },
        },
      });
      expect(result).toMatchObject([mockTask1]);
    });
    it('Gets max limit amount of tasks', async () => {
      const allResult = await getTasks({ TaskModel })({});
      expect(allResult.length).toBe(2);

      const limitResult = await getTasks({ TaskModel })({
        limit: 1,
      });
      expect(limitResult.length).toBe(1);
    });
    it('Gets tasks starting from offset', async () => {
      const firstResult = await getTasks({ TaskModel })({
        limit: 1,
        offset: 0,
      });
      expect(firstResult[0]).toMatchObject(mockTask1);

      const secondResult = await getTasks({ TaskModel })({
        limit: 1,
        offset: 1,
      });
      expect(secondResult[0]).toMatchObject(mockTask2);
    });
    it('Throws error if args are not valid', async () => {
      await expect(async () =>
        getTaskById({ TaskModel })({ unknown: true } as any),
      ).rejects.toThrow();
    });
  });

  describe('createTask', () => {
    it('Creates task if its valid', async () => {
      const result = await createTask({ TaskModel })({
        ...mockTask2,
      });
      const expected = {
        ...mockTask2,
        updatedAt: time,
        createdAt: time,
      };
      expect(result).toMatchObject(expected);

      expect(await TaskModel.findById(expected._id).exec()).toMatchObject(
        expected,
      );
    });
    it('Throws error for missing fields', async () => {
      await expect(async () =>
        createTask({ TaskModel })({} as any),
      ).rejects.toThrow();
    });
    it('Throws error if the task with the specified id already exists', async () => {
      await expect(async () =>
        createTask({ TaskModel })(mockTask1),
      ).rejects.toThrow();
    });
  });

  describe('updateTask', () => {
    it('Updates task with provided fields', async () => {
      const updatedName = 'updatedName';

      const result = await updateTask({ TaskModel })({
        _id: mockTask1._id,
        name: updatedName,
      });
      const expected = {
        ...mockTask1,
        name: updatedName,
        updatedAt: time,
      };
      expect(result).toMatchObject(expected);
      expect(await TaskModel.findById(expected._id).exec()).toMatchObject(
        expected,
      );
    });
    it('If orgId is given, the task is only updated if it belongs to the org', async () => {
      const updatedName = 'updatedName';

      const result = await updateTask({ TaskModel })({
        _id: mockTask1._id,
        orgId: 'other',
        name: updatedName,
      });
      expect(result).toBe(null);
    });
    it('Throws error for missing fields', async () => {
      await expect(async () =>
        updateTask({ TaskModel })({} as any),
      ).rejects.toThrow();
    });
    it("Returns null if task doesn't exist", async () => {
      const result = await updateTask({ TaskModel })(mockTask2);
      expect(result).toBe(null);
    });
  });
  describe('deleteTask', () => {
    it('Deletes task if exists', async () => {
      expect((await TaskModel.find({}).exec()).length).toBe(1);
      await deleteTask({ TaskModel })({
        _id: mockTask1._id,
      });
      expect((await TaskModel.find({}).exec()).length).toBe(0);
    });
    it('If orgId is given, the task is only deleted if it belongs to the org', async () => {
      expect((await TaskModel.find({}).exec()).length).toBe(1);
      await deleteTask({ TaskModel })({
        _id: mockTask1._id,
        orgId: 'other',
      });
      expect((await TaskModel.find({}).exec()).length).toBe(1);
    });
    it('Does nothing if the task does not exist', async () => {
      expect((await TaskModel.find({}).exec()).length).toBe(1);
      await deleteTask({ TaskModel })({
        _id: 'unknown',
      });
      expect((await TaskModel.find({}).exec()).length).toBe(1);
    });
    it('Throws error for missing fields', async () => {
      await expect(async () =>
        updateTask({ TaskModel })({} as any),
      ).rejects.toThrow();
    });
    it("Returns null if task doesn't exist", async () => {
      const result = await updateTask({ TaskModel })(mockTask2);
      expect(result).toBe(null);
    });
  });
});
