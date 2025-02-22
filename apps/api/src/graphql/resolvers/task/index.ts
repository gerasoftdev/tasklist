import type { Context } from '@/graphql/context';
import type { MutationResolvers, QueryResolvers } from '@/types/graphql';
import { formatSortBy } from '@/utils/formatSortBy';
import { DEFAULT_LIMIT } from '@/constants/query';

const getTasksResolver: QueryResolvers<Context>['getTasks'] = async (
  parent,
  { filters = {}, sortBy = [], limit = DEFAULT_LIMIT, offset = 0 },
  context,
) => {
  const { orgId } = context.request.requireUser();

  const tasks = await context.taskService.getTasks({
    filters: {
      ...filters,
      orgId: { eq: orgId },
    },
    sortBy: formatSortBy(sortBy),
    limit,
    offset,
  });

  return {
    data: tasks,
    limit,
    offset,
  };
};
const getTaskByIdResolver: QueryResolvers<Context>['getTaskById'] = async (
  parent,
  { _id },
  context,
) => {
  context.request.requireUser();

  const task = await context.taskService.getTaskById({ _id });

  return task;
};
const createTaskResolver: MutationResolvers<Context>['createTask'] = async (
  parent,
  { data: taskProps },
  context,
) => {
  const { orgId } = context.request.requireUser();

  const task = await context.taskService.createTask({ ...taskProps, orgId });

  return task;
};
const updateTaskResolver: MutationResolvers<Context>['updateTask'] = async (
  parent,
  { data: taskProps },
  context,
) => {
  const { orgId } = context.request.requireUser();

  const task = await context.taskService.updateTask({ ...taskProps, orgId });

  return task;
};
const deleteTaskResolver: MutationResolvers<Context>['deleteTask'] = async (
  parent,
  { data: taskProps },
  context,
) => {
  const { orgId } = context.request.requireUser();

  const result = await context.taskService.deleteTask({ ...taskProps, orgId });

  return result;
};

export const taskResolvers = {
  Query: {
    getTasks: getTasksResolver,
    getTaskById: getTaskByIdResolver,
  },
  Mutation: {
    createTask: createTaskResolver,
    updateTask: updateTaskResolver,
    deleteTask: deleteTaskResolver,
  },
};
