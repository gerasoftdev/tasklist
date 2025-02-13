import type { Connection, Model } from 'mongoose';
import type { User } from '@repo/types';
import errors from '@repo/translation/en/errors.json';
import { setBasicEventTimes, PasswordTokenSchema } from '@repo/mongodb-helpers';

type CreatePasswordTokenModelProps = {
  connection: Connection;
  UserModel: Model<User>;
};

export const createPasswordTokenModel = (
  props: CreatePasswordTokenModelProps,
) => {
  PasswordTokenSchema.path('userId').validate(async function validate(
    this,
    userId: string,
  ) {
    return props.UserModel.exists({ _id: userId });
  }, errors.userDoesNotExist);

  PasswordTokenSchema.pre('save', async function handler() {
    setBasicEventTimes(this);
  });

  return props.connection.model('PasswordToken', PasswordTokenSchema);
};
