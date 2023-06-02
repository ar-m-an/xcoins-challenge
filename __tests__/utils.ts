import mongoose from 'mongoose';

import { logger } from '../src/common/logger';

const TEST_DB_URL = 'mongodb://localhost:27017/xcoins-test';

export async function connectTestDb(): Promise<void | never> {
  try {
    await mongoose.connect(TEST_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    logger.error(error);
  }

  mongoose.connection.on('connected', () => {
    logger.info('Connected to MongoDB');
  });

  mongoose.connection.on('error', (error) => {
    logger.error('Error connecting to MongoDB:', error);
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Disconnected from MongoDB');
  });
}

export async function dropTestDb(): Promise<void | never> {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}
