import {
  connectToDb,
  setBasicEventTimes,
  CounterSchema,
} from '@repo/mongodb-helpers';
import { fastifyPlugin } from 'fastify-plugin';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { Connection } from 'mongoose';

type CreateCounterModelProps = {
  connection: Connection;
};

export const createCounterModel = (props: CreateCounterModelProps) => {
  CounterSchema.pre('save', async function handler() {
    setBasicEventTimes(this);
  });

  return props.connection.model('Counter', CounterSchema);
};

const counterId = 'counter';

export const increaseCounter =
  ({ CounterModel }: { CounterModel: ReturnType<typeof createCounterModel> }) =>
  async () => {
    let counter = await CounterModel.findOne({ _id: counterId });

    const { count = 0, updatedAt } = counter || {};

    if (!counter) {
      counter = new CounterModel({ _id: counterId, count: 0 });
    }

    counter.count += 1;
    await counter.save();

    return {
      count,
      lastStarted: updatedAt && new Date(updatedAt),
    };
  };

export const counterPluginName = 'counter-plugin';

const plugin: FastifyPluginAsyncZod = async (fastify) => {
  const connection = await connectToDb({
    connectionString: fastify.config.DB_CONNECTION_STRING,
  });

  const CounterModel = createCounterModel({ connection });

  fastify.decorate('increaseCounter', increaseCounter({ CounterModel }));

  fastify.addHook('onClose', async () => {
    await connection.close();
  });
};

export const counterPlugin = fastifyPlugin(plugin, {
  name: counterPluginName,
});
