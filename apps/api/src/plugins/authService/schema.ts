import type { authServiceFactory } from '@repo/auth-service';

declare module 'fastify' {
  interface FastifyInstance {
    authService: Awaited<ReturnType<typeof authServiceFactory>>;
  }
}
