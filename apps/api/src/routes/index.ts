import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { healthRoutes } from '@/routes/health';

export const routes: FastifyPluginAsyncZod = async (fastify) => {
  await Promise.all([fastify.register(healthRoutes, { prefix: '/health' })]);
};
