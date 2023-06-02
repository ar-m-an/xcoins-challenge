import request from 'supertest';

import { connectTestDb, dropTestDb } from './utils';
import server from '../src/api';
import { Favorite } from '../src/models/Favorite';

describe('favorites API', () => {
  beforeEach(async () => {
    await connectTestDb();
  });

  afterEach(async () => {
    await server.close();
    await dropTestDb();
  });

  it('can list all favorite by profile id', async () => {
    const profile_id = '123';
    await Favorite.create({
      profile_id,
      name: 'Favorite 1',
      favorite1: 'fav1',
      favorite2: 'fav2',
      favorite3: 'fav3',
    });
    await Favorite.create({
      profile_id,
      name: 'Favorite 2',
      favorite1: 'fav1',
      favorite2: 'fav2',
      favorite3: 'fav3',
    });
    await Favorite.create({
      profile_id: '456',
      name: 'Favorite 3',
      favorite1: 'fav1',
      favorite2: 'fav2',
      favorite3: 'fav3',
    });

    const response = await request(server).get(`/api/favorite/${profile_id}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(response.body[0].profile_id).toEqual(profile_id);
  });

  it('can list all favorites', async () => {
    await Favorite.create({
      profile_id: '123',
      name: 'Favorite 1',
      favorite1: 'fav1',
      favorite2: 'fav2',
      favorite3: 'fav3',
    });
    await Favorite.create({
      profile_id: '456',
      name: 'Favorite 2',
      favorite1: 'fav1',
      favorite2: 'fav2',
      favorite3: 'fav3',
    });

    const response = await request(server).get('/api/favorite/');

    expect(response.status).toEqual(200);
    expect(response.body.favorite.length).toEqual(2);
    expect(response.body.favorite[0].profile_id).toEqual('123');
    expect(response.body.favorite[1].profile_id).toEqual('456');
  });
});
