/* v8 ignore start */

import { Schema } from 'mongoose';
import type { Task } from '@repo/types';
import { baseDocumentFields } from '../constants';

export const TaskSchema = new Schema<Task>({
  ...baseDocumentFields,

  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
  },
});
