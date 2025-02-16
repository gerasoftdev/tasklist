import closeWithGrace from 'close-with-grace';
import { startServer } from '@/server';
import { config } from '@/config';

const start = async () => {
  const port = config.PORT;
  const server = await startServer(config);

  if (config.NODE_ENV === 'dev') {
    // eslint-disable-next-line -- logging time required to start server locally
    console.time('Server started in');
  }
  await server.listen({ port, host: '0.0.0.0' });

  if (config.NODE_ENV === 'dev') {
    // eslint-disable-next-line -- logging time required to start server locally
    console.timeEnd('Server started in');
  }

  closeWithGrace({ delay: 500 }, async ({ signal, err }) => {
    if (err) {
      server.log.error(err, 'Unhandled error was caught, closing server');
    }
    await server.close();
    server.log.info({ signal }, 'Server closed');

    if (err) {
      process.exit(1);
    }
  });
};

void start();
