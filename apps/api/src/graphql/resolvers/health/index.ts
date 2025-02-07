import type { Context } from '@/graphql/context';
import type { QueryResolvers } from '@/types/graphql';

const healthResolver: QueryResolvers<Context>['health'] = async () => true;

export const healthResolvers = {
  Query: {
    health: healthResolver,
  },
};
