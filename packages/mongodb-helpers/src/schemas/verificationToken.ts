import { Schema } from 'mongoose';
import type { VerificationToken } from '@repo/types';
import { baseDocumentFields } from '../constants';

const { orgId: _toExclude, ...BaseDocumentFieldsWithoutOrgId } =
  baseDocumentFields;

export const VerificationTokenSchema = new Schema<VerificationToken>({
  ...BaseDocumentFieldsWithoutOrgId,

  orgId: {
    type: String,
  },
  email: {
    type: String,
    description: 'The email of the user',
    required: true,
  },
  expiresAt: {
    type: Number,
    description: 'Expiry date of the token',
    required: true,
  },
});
