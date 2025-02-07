import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { version } from '../../package.json';

export const openapi: FastifyDynamicSwaggerOptions['openapi'] = {
  info: {
    title: 'Task list API',
    description: 'Task list API',
    version,
  },
  servers: [],
};
