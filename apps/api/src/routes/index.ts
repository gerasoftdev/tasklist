import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { healthRoutes } from '@/routes/health';
import { graphqlRoutes } from '@/routes/graphql';

export const routes: FastifyPluginAsyncZod = async (fastify) => {
  await Promise.all([
    fastify.register(graphqlRoutes, { prefix: '/graphql' }),
    fastify.register(healthRoutes, { prefix: '/health' }),
  ]);
};
