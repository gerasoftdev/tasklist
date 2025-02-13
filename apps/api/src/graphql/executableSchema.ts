import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { commonTypeDefs, healthTypeDefs, userTypeDefs } from '@repo/graphql';
import { lexicographicSortSchema } from 'graphql';
import { commonResolvers } from '@/graphql/resolvers/common';
import { healthResolvers } from '@/graphql/resolvers/health';
import { userResolvers } from '@/graphql/resolvers/user';

const typeDefs = mergeTypeDefs([commonTypeDefs, healthTypeDefs, userTypeDefs]);

const resolvers = mergeResolvers([
  commonResolvers,
  healthResolvers,
  userResolvers,
]);

export const executableSchema = lexicographicSortSchema(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
);
