import { Router } from 'express';

import { SimulatorController } from '../controllers';
import validators from '../validators';

export const router = Router();

router.get('/api/simulator', SimulatorController.getSimulators);
router.get(
  '/api/simulator/:profile_id',
  validators.getSimulatorByProfile,
  SimulatorController.getSimulatorsByProfile
);
router.post(
  '/api/simulator/:profile_id',
  validators.createSimulator,
  SimulatorController.createSimulator
);
