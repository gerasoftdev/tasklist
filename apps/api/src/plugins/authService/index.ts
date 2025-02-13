import { fastifyPlugin } from 'fastify-plugin';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authServiceFactory } from '@repo/auth-service';

export const authServicePluginName = 'auth-service-plugin';

const plugin: FastifyPluginAsyncZod = async (fastify) => {
  const authService = await authServiceFactory({
    ENV: fastify.config.ENV,
    NODE_ENV: fastify.config.NODE_ENV,
    DB_CONNECTION_STRING: fastify.config.DB_CONNECTION_STRING,
    AWS_REGION: fastify.config.AWS_REGION,
    DOMAIN_NAME: fastify.config.DOMAIN_NAME,
    VERIFICATION_URL: fastify.config.VERIFICATION_URL,
    PASSWORD_RESET_URL: fastify.config.PASSWORD_RESET_URL,
    ACCESS_TOKEN_KEY: fastify.config.ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY: fastify.config.REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_EXPIRY: fastify.config.ACCESS_TOKEN_EXPIRY,
    VERIFICATION_TOKEN_EXPIRY: fastify.config.VERIFICATION_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: fastify.config.REFRESH_TOKEN_EXPIRY,
    PASSWORD_TOKEN_EXPIRY: fastify.config.PASSWORD_TOKEN_EXPIRY,
  });
  fastify.decorate('authService', authService);

  fastify.addHook('onClose', async () => {
    await authService.connection.close();
  });
};

export const authServicePlugin = fastifyPlugin(plugin, {
  name: authServicePluginName,
});
