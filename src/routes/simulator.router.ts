import express from 'express';
import cors from 'cors';

import { SimulatorModel } from '../models';

const app = express();
app.use(cors());

export const router = express.Router();

router.get('/api/simulator', async (req, res) => {
  const simulator = await SimulatorModel.find().lean();
  console.log(simulator);
  res.json({ simulator });
});

router.get('/api/simulator/:profile_id', async (req, res) => {
  console.log('========== ');
  const { profile_id } = req.params;
  console.log({ profile_id });
  const query = { profileId: profile_id };
  const data = await SimulatorModel.find(query);
  res.json(data);
});

router.post('/api/simulator/:profile_id', async (req, res) => {
  const { profile_id } = req.params;
  const newData = {
    ...req.body,
    profileId: profile_id,
  };
  console.log(newData, req.body);
  const simulator = await SimulatorModel.create(newData);
  res.json(simulator);
});
