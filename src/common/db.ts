import mongoose from 'mongoose';

import { logger } from './logger';
import { DBURL, TEST_DBURL } from '../config';

export async function connectDb(): Promise<void | never> {
  const url = process.env.NODE_ENV === 'test' ? TEST_DBURL : DBURL;
  try {
    await mongoose.connect(url, {
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
  await mongoose.disconnect();
}
