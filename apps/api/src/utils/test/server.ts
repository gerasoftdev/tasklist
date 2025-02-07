import type { FastifyError } from 'fastify';
import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import type { Config } from '@/config/schema';
import { defaultConfigValues } from '@/config/schema';

const defaultConfig: Config = {
  ...defaultConfigValues,
  NODE_ENV: 'test',
  CORS_ALLOWLIST: [],
};

type Options = {
  config?: Partial<Config>;
};

export const startTestServer = async ({ config }: Options | undefined = {}) => {
  const fastify = await Fastify({ logger: false });

  fastify.setErrorHandler((error: FastifyError, request, response) => {
    response.status(error.statusCode || 500).send({
      ...error,
    });
  });

  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.decorate('config', { ...config, ...defaultConfig });

  return fastify;
};
