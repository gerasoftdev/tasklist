import type { Connection } from 'mongoose';
import { setBasicEventTimes, TaskSchema } from '@repo/mongodb-helpers';

type CreateTaskModelProps = {
  connection: Connection;
};

export const createTaskModel = (props: CreateTaskModelProps) => {
  TaskSchema.pre('save', async function handler() {
    const isCompleted = this.isModified('isCompleted') && this.isCompleted;
    if (isCompleted) this.completedAt = Date.now();

    setBasicEventTimes(this);
  });

  return props.connection.model('Task', TaskSchema);
};
