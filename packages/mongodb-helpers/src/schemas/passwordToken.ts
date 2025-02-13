import { Schema } from 'mongoose';
import type { PasswordToken } from '@repo/types';
import { baseDocumentFields } from '../constants';

const { orgId: _toExclude, ...BaseDocumentFieldsWithoutOrgId } =
  baseDocumentFields;

export const PasswordTokenSchema = new Schema<PasswordToken>({
  ...BaseDocumentFieldsWithoutOrgId,

  userId: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Number,
    description: 'Expiry date of the token',
    required: true,
  },
});
