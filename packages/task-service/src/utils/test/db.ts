import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export type MongoDbTestEnvironment = {
  mongoServer: MongoMemoryServer;
};

export const connectToDb = async (): Promise<MongoDbTestEnvironment> => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  return { mongoServer };
};

export const resetDb = async () => {
  await mongoose.connection.db?.dropDatabase();
};

export const disconnectFromDb = async (
  testEnvironment: MongoDbTestEnvironment,
) => {
  await mongoose.disconnect();
  await testEnvironment.mongoServer.stop();
};
