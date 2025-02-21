import { connectToDb } from '@repo/mongodb-helpers';
import type { Config } from './handlers/types';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from './handlers';
import { createTaskModel } from './models';

export const taskServiceFactory = async (config: Config) => {
  const connection = await connectToDb({
    connectionString: config.DB_CONNECTION_STRING,
  });
  const TaskModel = createTaskModel({ connection });

  const props = {
    TaskModel,
  };

  return {
    connection,
    getTaskById: getTaskById(props),
    getTasks: getTasks(props),
    createTask: createTask(props),
    updateTask: updateTask(props),
    deleteTask: deleteTask(props),
  };
};
