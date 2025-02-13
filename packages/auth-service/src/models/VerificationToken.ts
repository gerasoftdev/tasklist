import type { Connection, Model } from 'mongoose';
import type { Organization } from '@repo/types';
import errors from '@repo/translation/en/errors.json';
import {
  setBasicEventTimes,
  VerificationTokenSchema,
} from '@repo/mongodb-helpers';

type CreateVerificationTokenModelProps = {
  connection: Connection;
  OrganizationModel: Model<Organization>;
};

export const createVerificationTokenModel = (
  props: CreateVerificationTokenModelProps,
) => {
  VerificationTokenSchema.path('orgId').validate(async function validate(
    this,
    orgId: string,
  ) {
    return !orgId || props.OrganizationModel.exists({ _id: orgId });
  }, errors.organizationDoesNotExist);

  VerificationTokenSchema.pre('save', async function handler() {
    setBasicEventTimes(this);
  });

  return props.connection.model('VerificationToken', VerificationTokenSchema);
};
