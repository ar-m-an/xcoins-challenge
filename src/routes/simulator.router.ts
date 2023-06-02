import { Router } from 'express';

import { SimulatorController } from '../controllers';

export const router = Router();

router.get('/api/simulator', SimulatorController.getSimulators);
router.get(
  '/api/simulator/:profile_id',
  SimulatorController.getSimulatorsByProfile
);
router.post('/api/simulator/:profile_id', SimulatorController.createSimulator);
