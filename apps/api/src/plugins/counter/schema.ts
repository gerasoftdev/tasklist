import type { increaseCounter } from '@/plugins/counter';

declare module 'fastify' {
  interface FastifyInstance {
    increaseCounter: ReturnType<typeof increaseCounter>;
  }
}
