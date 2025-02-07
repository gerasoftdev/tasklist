import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getHealthResponseSchema } from '@/routes/health/schema';

export const healthRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Health'],
        response: { 200: getHealthResponseSchema },
      },
    },
    async () => {
      return { ok: true };
    },
  );
};
