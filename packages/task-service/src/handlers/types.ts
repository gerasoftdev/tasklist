import type { Task } from '@repo/types';
import type { Model } from 'mongoose';

export type Config = {
  DB_CONNECTION_STRING: string;
};

export type HandlerProps = {
  TaskModel: Model<Task>;
};
