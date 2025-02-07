import { Schema } from 'mongoose';
import { baseDocumentFields } from '../constants';

const { orgId: _toExclude, ...baseDocumentFieldsWOOrgId } = baseDocumentFields;

export const CounterSchema = new Schema({
  ...baseDocumentFieldsWOOrgId,
  count: {
    type: Number,
    default: 0,
  },
});
