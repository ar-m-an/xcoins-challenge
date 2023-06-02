import mongoose from 'mongoose';

const TEST_DB_URL = 'mongodb://localhost:27017/xcoins-test';

export async function connectTestDb(): Promise<void | never> {
  try {
    await mongoose.connect(TEST_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
}

export async function dropTestDb(): Promise<void | never> {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}
