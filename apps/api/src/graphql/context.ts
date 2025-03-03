import type { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export type Context = {
  request: FastifyRequest;
  response: FastifyReply;
} & Pick<FastifyInstance, 'authService' | 'taskService' | 'config'>;

export const contextFunction =
  (fastify: FastifyInstance): ApolloFastifyContextFunction<Context> =>
  async (request, response) => {
    return {
      config: fastify.config,
      authService: fastify.authService,
      taskService: fastify.taskService,
      request,
      response,
    };
  };
