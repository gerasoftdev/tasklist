import type { InferRawDocType } from 'mongoose';
import { v4 as uuid } from 'uuid';

export const baseDocumentFields = {
  _id: {
    type: String,
    description: 'ID of the document',
    required: true,
    default: () => uuid(),
  },
  orgId: {
    type: String,
    description: 'ID of the organization the document belongs to',
    required: true,
  },

  createdAt: {
    type: Number,
    default: () => Date.now(),
    description: 'When the document is created',
  },
  updatedAt: {
    type: Number,
    default: () => Date.now(),
    description: 'When the document is updated',
  },
};

export type BaseDocumentFields = InferRawDocType<typeof baseDocumentFields>;
