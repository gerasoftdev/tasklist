import { Schema } from 'mongoose';
import type { RefreshToken } from '@repo/types';
import { baseDocumentFields } from '../constants';

const { orgId: _toExclude, ...BaseDocumentFieldsWithoutOrgId } =
  baseDocumentFields;

export const RefreshTokenSchema = new Schema<RefreshToken>({
  ...BaseDocumentFieldsWithoutOrgId,

  userId: {
    type: String,
    required: true,
  },
  orgId: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Number,
    description: 'Expiry date of the token',
    required: true,
  },
});
