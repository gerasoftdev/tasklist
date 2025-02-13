import type { Organization } from '@repo/types';
import { Schema } from 'mongoose';
import { baseDocumentFields } from '../constants';

const { orgId: _toExclude, ...BaseDocumentFieldsWOOrgId } = baseDocumentFields;

export const OrganizationSchema = new Schema<Organization>({
  ...BaseDocumentFieldsWOOrgId,
  name: {
    type: String,
    description: 'Name of the organization',
  },
});
