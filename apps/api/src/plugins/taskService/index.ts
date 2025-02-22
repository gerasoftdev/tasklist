import { fastifyPlugin } from 'fastify-plugin';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { taskServiceFactory } from '@repo/task-service';

export const taskServicePluginName = 'task-service-plugin';

const plugin: FastifyPluginAsyncZod = async (fastify) => {
  const taskService = await taskServiceFactory({
    DB_CONNECTION_STRING: fastify.config.DB_CONNECTION_STRING,
  });
  fastify.decorate('taskService', taskService);

  fastify.addHook('onClose', async () => {
    await taskService.connection.close();
  });
};

export const taskServicePlugin = fastifyPlugin(plugin, {
  name: taskServicePluginName,
});
