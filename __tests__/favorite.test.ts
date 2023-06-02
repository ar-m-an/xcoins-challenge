import request from 'supertest';
import mongoose from 'mongoose';

import { connectTestDb, dropTestDb } from './utils';
import server from '../src/api';
import { FavoriteModel } from '../src/models';

describe('favorites API', () => {
  beforeEach(async () => {
    await connectTestDb();
  });

  afterEach(async () => {
    await server.close();
    await dropTestDb();
  });

  it('can list all favorite by profile id', async () => {
    const profileId = new mongoose.Types.ObjectId();

    await FavoriteModel.create({
      profileId: profileId,
      name: 'Favorite 1',
      favorites: ['fav1', 'fav2', 'fav3'],
    });
    await FavoriteModel.create({
      profileId: profileId,
      name: 'Favorite 2',
      favorites: ['fav1', 'fav2', 'fav3'],
    });
    await FavoriteModel.create({
      profileId: new mongoose.Types.ObjectId(),
      name: 'Favorite 3',
      favorites: ['fav1', 'fav2', 'fav3'],
    });

    const response = await request(server).get(
      `/api/favorite/${profileId.toString()}`
    );

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(response.body[0].profileId).toEqual(profileId.toString());
    expect(response.body[0].favorites.length).toEqual(3);
  });

  it('can list all favorites', async () => {
    await FavoriteModel.create({
      profileId: new mongoose.Types.ObjectId(),
      name: 'Favorite 1',
      favorites: ['fav1', 'fav2', 'fav3'],
    });
    await FavoriteModel.create({
      profileId: new mongoose.Types.ObjectId(),
      name: 'Favorite 2',
      favorites: ['fav1', 'fav2', 'fav3'],
    });

    const response = await request(server).get('/api/favorite/');

    expect(response.status).toEqual(200);
    expect(response.body.favorite.length).toEqual(2);
  });
});
