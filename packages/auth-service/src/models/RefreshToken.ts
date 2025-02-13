import type { Connection } from 'mongoose';
import { setBasicEventTimes, RefreshTokenSchema } from '@repo/mongodb-helpers';

type CreateRefreshTokenModelProps = {
  connection: Connection;
};

export const createRefreshTokenModel = (
  props: CreateRefreshTokenModelProps,
) => {
  RefreshTokenSchema.pre('save', async function handler() {
    setBasicEventTimes(this);
  });

  return props.connection.model('RefreshToken', RefreshTokenSchema);
};
