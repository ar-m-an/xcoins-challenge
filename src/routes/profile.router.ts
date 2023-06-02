import express from 'express';

import { ProfileModel } from '../models';

export const router = express.Router();

router.get('/api/profile', async (req, res) => {
  const profile = await ProfileModel.find().lean();
  console.log(profile);
  res.json({ profile });
});

router.post('/api/profile', async (req, res) => {
  const { email, name, nickname } = req.body;

  let profile = await ProfileModel.findOne({
    $or: [{ email }, { nickname }],
  }).exec();

  if (!profile) {
    profile = await ProfileModel.create({ name, email, nickname });
  }

  res.json(profile);
});
