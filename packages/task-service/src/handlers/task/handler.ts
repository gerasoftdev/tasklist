import { formatFilters } from '@repo/mongodb-helpers';
import { validateArgs } from '@repo/utils';
import type { HandlerProps } from '../types';
import {
  createTaskArgsSchema,
  deleteTaskArgsSchema,
  getTaskByIdArgsSchema,
  getTasksArgsSchema,
  updateTaskArgsSchema,
} from './schema';

export const getTaskById = ({ TaskModel }: HandlerProps) =>
  validateArgs(getTaskByIdArgsSchema, async (args) => {
    const { _id, orgId } = args;

    const result = TaskModel.findOne({
      _id,
      ...(orgId ? { orgId } : {}),
    }).exec();
    return result;
  });

export const getTasks = ({ TaskModel }: HandlerProps) =>
  validateArgs(
    getTasksArgsSchema,
    async ({ filters = {}, sortBy = {}, limit = 25, offset = 0 }) => {
      const formattedFilters = formatFilters(filters);
      return TaskModel.find(formattedFilters)
        .sort(sortBy)
        .limit(limit)
        .skip(offset)
        .exec();
    },
  );

export const createTask = ({ TaskModel }: HandlerProps) =>
  validateArgs(createTaskArgsSchema, async (args) => {
    const task = await TaskModel.create(args);
    return task.toObject();
  });

export const updateTask = ({ TaskModel }: HandlerProps) =>
  validateArgs(
    updateTaskArgsSchema,
    async ({ _id, orgId, ...updateFields }) => {
      const task = await TaskModel.findOneAndUpdate(
        {
          _id,
          ...(orgId ? { orgId } : {}),
        },
        {
          ...updateFields,
          updatedAt: Date.now(),
        },
        { new: true },
      );
      return task?.toObject() || null;
    },
  );

export const deleteTask = ({ TaskModel }: HandlerProps) =>
  validateArgs(deleteTaskArgsSchema, async ({ _id, orgId }) => {
    await TaskModel.findOneAndDelete({
      _id,
      ...(orgId ? { orgId } : {}),
    }).exec();

    return true;
  });
