import type { Connection, Model } from 'mongoose';
import type { Organization } from '@repo/types';
import errors from '@repo/translation/en/errors.json';
import { setBasicEventTimes, UserSchema } from '@repo/mongodb-helpers';

type CreateUserModelProps = {
  connection: Connection;
  OrganizationModel: Model<Organization>;
};

export const createUserModel = (props: CreateUserModelProps) => {
  UserSchema.path('orgId').validate(async function validate(
    this,
    orgId: string,
  ) {
    return !orgId || props.OrganizationModel.exists({ _id: orgId });
  }, errors.organizationDoesNotExist);

  UserSchema.pre('save', async function handler() {
    setBasicEventTimes(this);
  });

  return props.connection.model('User', UserSchema);
};
