import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import {
  commonTypeDefs,
  healthTypeDefs,
  taskTypeDefs,
  userTypeDefs,
} from '@repo/graphql';
import { lexicographicSortSchema } from 'graphql';
import { commonResolvers } from '@/graphql/resolvers/common';
import { healthResolvers } from '@/graphql/resolvers/health';
import { userResolvers } from '@/graphql/resolvers/user';
import { taskResolvers } from '@/graphql/resolvers/task';

const typeDefs = mergeTypeDefs([
  commonTypeDefs,
  healthTypeDefs,
  userTypeDefs,
  taskTypeDefs,
]);

const resolvers = mergeResolvers([
  commonResolvers,
  healthResolvers,
  userResolvers,
  taskResolvers,
]);

export const executableSchema = lexicographicSortSchema(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
);
