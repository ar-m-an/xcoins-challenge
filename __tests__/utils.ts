import mongoose from 'mongoose';
import { Server } from 'http';

import app from '../src/api';
import { PORT } from '../src/config';
import { connectDb } from '../src/common/db';

export async function testSetup(): Promise<Server | never> {
  await connectDb();
  await mongoose.connection.dropDatabase();

  const server = await app.listen(PORT);

  return server;
}

export async function testTearDown(server: Server): Promise<void | never> {
  await server.close();
  await mongoose.disconnect();
}
