import express from 'express';

import { FavoriteModel } from '../models';

export const router = express.Router();

router.get('/api/favorite', async (req, res) => {
  const favorite = await FavoriteModel.find().lean();
  console.log(favorite);
  res.json({ favorite });
});

router.get('/api/favorite/:profile_id', async (req, res) => {
  console.log(req.params);
  const { profile_id } = req.params;
  const query = { profileId: profile_id };
  console.log(query);
  const data = await FavoriteModel.find(query);
  res.json(data);
});
