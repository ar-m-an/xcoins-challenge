import { Request, Response } from 'express';

import { ProfileModel } from '../models';

async function getProfiles(req: Request, res: Response): Promise<Response> {
  const profile = await ProfileModel.find().lean();

  return res.status(200).json({ profile });
}

async function findOrCreateProfile(
  req: Request,
  res: Response
): Promise<Response> {
  const { email, name, nickname } = req.body;

  let profile = await ProfileModel.findOne({
    $or: [{ email }, { nickname }],
  }).exec();

  if (!profile) {
    profile = await ProfileModel.create({ name, email, nickname });

    return res.status(201).json(profile);
  }

  return res.status(200).json(profile);
}

export default {
  getProfiles,
  findOrCreateProfile,
};
