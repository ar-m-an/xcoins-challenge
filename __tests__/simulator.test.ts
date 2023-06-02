import request from 'supertest';
import mongoose from 'mongoose';

import { connectTestDb, dropTestDb } from './utils';
import server from '../src/api';
import { Simulator } from '../src/models/Simulator';

describe('simulators API', () => {
  beforeEach(async () => {
    await connectTestDb();
  });

  afterEach(async () => {
    await server.close();
    await dropTestDb();
  });

  it('can list all simulators', async () => {
    await Simulator.create({
      profile_id: new mongoose.Types.ObjectId(),
      dateRecorded: new Date(),
      cryptocurrency: 'ETH',
      euros: 1000,
      price: 1200,
      quantity: 10,
    });
    await Simulator.create({
      profile_id: new mongoose.Types.ObjectId(),
      dateRecorded: new Date(),
      cryptocurrency: 'BTC',
      euros: 10000,
      price: 12000,
      quantity: 20,
    });

    const response = await request(server).get('/api/simulator/');

    expect(response.statusCode).toEqual(200);
    expect(response.body.simulator.length).toEqual(2);
  });

  it('can list all simulators for a profile', async () => {
    const profileId = new mongoose.Types.ObjectId();
    await Simulator.create({
      profile_id: profileId,
      dateRecorded: new Date(),
      cryptocurrency: 'ETH',
      euros: 1000,
      price: 1200,
      quantity: 10,
    });
    await Simulator.create({
      profile_id: profileId,
      dateRecorded: new Date(),
      cryptocurrency: 'BTC',
      euros: 10000,
      price: 12000,
      quantity: 20,
    });
    await Simulator.create({
      profile_id: new mongoose.Types.ObjectId(),
      dateRecorded: new Date(),
      cryptocurrency: 'BTC',
      euros: 10000,
      price: 12000,
      quantity: 20,
    });

    const response = await request(server).get(`/api/simulator/${profileId}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it('can create a simulator for a profile', async () => {
    const profileId = new mongoose.Types.ObjectId();
    const simulator = {
      dateRecorded: new Date(),
      cryptocurrency: 'ETH',
      euros: 1000,
      price: 1200,
      quantity: 10,
    };

    const response = await request(server)
      .post(`/api/simulator/${profileId.toString()}`)
      .set(simulator);

    // Todo: return 201 status code
    expect(response.statusCode).toEqual(200);
    expect(response.body.profile_id).toEqual(profileId.toString());
  });
});
