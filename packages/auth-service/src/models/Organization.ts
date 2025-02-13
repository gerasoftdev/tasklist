import type { Connection } from 'mongoose';
import { setBasicEventTimes, OrganizationSchema } from '@repo/mongodb-helpers';

type CreateOrganizationModelProps = {
  connection: Connection;
};

export const createOrganizationModel = (
  props: CreateOrganizationModelProps,
) => {
  OrganizationSchema.pre('save', async function handler() {
    setBasicEventTimes(this);
  });

  return props.connection.model('Organization', OrganizationSchema);
};
