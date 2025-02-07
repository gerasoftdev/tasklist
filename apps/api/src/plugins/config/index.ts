import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { fastifyPlugin } from 'fastify-plugin';
import { config } from '@/config';

export const configPluginName = 'config-plugin';

const plugin: FastifyPluginAsyncZod = async (fastify) => {
  fastify.decorate('config', { ...config });
};

export const configPlugin = fastifyPlugin(plugin, {
  name: configPluginName,
});
