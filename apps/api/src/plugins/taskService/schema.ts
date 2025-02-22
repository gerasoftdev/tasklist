import type { taskServiceFactory } from '@repo/task-service';

declare module 'fastify' {
  interface FastifyInstance {
    taskService: Awaited<ReturnType<typeof taskServiceFactory>>;
  }
}
