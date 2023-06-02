import request from 'supertest';

import { connectTestDb, dropTestDb } from './utils';
import server from '../src/api';
import { Profile } from '../src/models/Profile';

describe.only('profiles API', () => {
  beforeEach(async () => {
    await connectTestDb();
  });

  afterEach(async () => {
    await server.close();
    await dropTestDb();
  });

  it('can list all profiles', async () => {
    await Profile.create({
      name: 'John',
      nickname: 'johnny',
      email: 'john@example.com',
      capital: 1000,
      divisa: 'divisa',
      prefered_cryptocurrency: 'BTC',
    });
    await Profile.create({
      name: 'James',
      nickname: 'jimmy',
      email: 'jamse@example.com',
      capital: 2000,
      divisa: 'divisa',
      prefered_cryptocurrency: 'ETH',
    });

    const response = await request(server).get('/api/profile/');

    expect(response.statusCode).toEqual(200);
    expect(response.body.profile.length).toEqual(2);
  });

  it('can create profile if not existing', async () => {
    const profileData = {
      name: 'John',
      nickname: 'johnny',
      email: 'john@example.com',
    };

    const response = await request(server)
      .post('/api/profile/')
      .send(profileData);

    console.log(response.body);
    // todo: send 201 code
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual(profileData.name);
    expect(response.body.email).toEqual(profileData.email);
    expect(response.body.nickname).toEqual(profileData.nickname);
  });

  it('can find profile by nickname or email', async () => {
    const profileData = {
      name: 'John',
      nickname: 'johnny',
      email: 'john@example.com',
    };

    await Profile.create({ ...profileData });

    const response = await request(server)
      .post('/api/profile/')
      .send(profileData);

    console.log(response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.body.email).toEqual(profileData.email);
  });
});
