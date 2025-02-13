import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  refreshTokensBodySchema,
  refreshTokensResponseSchema,
} from '@/routes/auth/schema';

export const authRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    '/refreshTokens',
    {
      schema: {
        tags: ['Auth'],
        response: { 200: refreshTokensResponseSchema },
        body: refreshTokensBodySchema,
      },
    },
    async (request, response) => {
      const refreshToken =
        request.cookies.refreshToken || request.body?.refreshToken;

      const tokens = await response.refreshToken(refreshToken);

      return tokens;
    },
  );
};
