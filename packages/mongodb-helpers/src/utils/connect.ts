import type { Connection, ConnectOptions } from 'mongoose';
import { ConnectionStates, createConnection } from 'mongoose';

let connection: Connection | null = null;

const connectionOptions: ConnectOptions = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  maxPoolSize: 10,
  autoIndex: false,
};

type DbProps = {
  connectionString: string;
};

export const connectToDb = async (props: DbProps) => {
  if (!connection || connection.readyState === ConnectionStates.disconnected)
    connection = await createConnection(
      props.connectionString,
      connectionOptions,
    ).asPromise();

  return connection;
};
