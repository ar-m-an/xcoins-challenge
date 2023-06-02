import { Request, Response } from 'express';

import { FavoriteModel } from '../models';

async function getFavorites(req: Request, res: Response): Promise<Response> {
  const favorite = await FavoriteModel.find().lean();

  return res.status(200).json({ favorite });
}

async function getFavoritesByProfile(
  req: Request,
  res: Response
): Promise<Response> {
  const { profile_id } = req.params;
  const query = { profileId: profile_id };
  const data = await FavoriteModel.find(query);

  return res.status(200).json(data);
}

export default {
  getFavorites,
  getFavoritesByProfile,
};
