import { Request, Response } from 'express';

import { SimulatorModel } from '../models';

async function getSimulators(req: Request, res: Response): Promise<Response> {
  const simulator = await SimulatorModel.find().lean();

  return res.status(200).json({ simulator });
}

async function getSimulatorsByProfile(
  req: Request,
  res: Response
): Promise<Response> {
  const { profile_id } = req.params;
  const query = { profileId: profile_id };
  const data = await SimulatorModel.find(query);

  return res.status(200).json(data);
}

async function createSimulator(req: Request, res: Response): Promise<Response> {
  const { profile_id } = req.params;
  const newData = {
    ...req.body,
    profileId: profile_id,
  };

  const simulator = await SimulatorModel.create(newData);

  return res.status(201).json(simulator);
}

export default {
  getSimulators,
  getSimulatorsByProfile,
  createSimulator,
};
