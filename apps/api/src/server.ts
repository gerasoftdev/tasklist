import compress from '@fastify/compress';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import type { FastifyError, FastifyServerOptions } from 'fastify';
import Fastify from 'fastify';
import underPressure from '@fastify/under-pressure';
import { fastifySwagger } from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { fastifyCookie } from '@fastify/cookie';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { GeneralError } from '@repo/utils';
import type { Config } from '@/config/schema';
import { openapi } from '@/openapi';
import { routes } from '@/routes';
import { plugins } from '@/plugins';

export const startServer = async (config: Config) => {
  const options: FastifyServerOptions = {
    disableRequestLogging: false,
    logger: {
      level: config.NODE_ENV === 'dev' ? 'debug' : 'info',
      ...(config.NODE_ENV === 'dev' && {
        transport: { target: 'pino-pretty' },
      }),
      serializers: {
        req: (req) => ({ method: req.method, url: req.url }),
      },
    },
  };
  const fastify = await Fastify(options);

  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.setErrorHandler(
    (error: FastifyError | GeneralError, request, response) => {
      if (error instanceof GeneralError) {
        response.status(error.statusCode).send({
          ...error,
        });
      } else {
        fastify.log.error(error);
        const somethingWentWrongError = new GeneralError('somethingWentWrong');
        response
          .status(error.statusCode || somethingWentWrongError.statusCode)
          .send({
            ...somethingWentWrongError,
          });
      }
    },
  );

  await Promise.all([
    fastify.register(fastifySwagger, {
      openapi,
      transform: jsonSchemaTransform,
      hideUntagged: true,
    }),
    fastify.register(fastifySwaggerUI, {
      routePrefix: '/documentation',
    }),
    fastify.register(rateLimit),
    fastify.register(fastifyCookie, {
      secret: config.COOKIES_KEY,
    }),
    fastify.register(helmet),
    fastify.register(cors, {
      origin: config.CORS_ALLOWLIST,
      credentials: true,
    }),
    fastify.register(compress),
    fastify.register(underPressure, {
      maxEventLoopDelay: config.MAX_EVENT_LOOP_DELAY,
      maxHeapUsedBytes: config.MAX_HEAP_USED_BYTES,
      maxRssBytes: config.MAX_RSS_BYTES,
    }),
  ]);

  await Promise.all(plugins.map((plugin) => fastify.register(plugin)));

  await fastify.register(routes);

  return fastify;
};
