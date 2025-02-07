import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { commonTypeDefs, healthTypeDefs } from '@repo/graphql';
import { lexicographicSortSchema } from 'graphql';
import { commonResolvers } from '@/graphql/resolvers/common';
import { healthResolvers } from '@/graphql/resolvers/health';

const typeDefs = mergeTypeDefs([commonTypeDefs, healthTypeDefs]);

const resolvers = mergeResolvers([commonResolvers, healthResolvers]);

export const executableSchema = lexicographicSortSchema(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
);
