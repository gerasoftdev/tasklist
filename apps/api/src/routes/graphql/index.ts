import { ApolloServer } from '@apollo/server';
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { GeneralError } from '@repo/utils';
import { contextFunction } from '@/graphql/context';
import type { Context } from '@/graphql/context';
import { executableSchema } from '@/graphql/executableSchema';

export const graphqlRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const apollo = new ApolloServer<Context>({
    schema: executableSchema,
    plugins: [fastifyApolloDrainPlugin(fastify)],
    formatError: (error) => {
      if (error.extensions?.isHandled) return error;
      fastify.log.error(error);
      return new GeneralError('somethingWentWrong');
    },
  });
  await apollo.start();

  const context = contextFunction(fastify);

  fastify.post(
    '/',
    fastifyApolloHandler(apollo, {
      context,
    }),
  );
};
