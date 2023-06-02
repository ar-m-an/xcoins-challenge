import express from 'express';

import { ProfileController } from '../controllers';
import validators from '../validators';

export const router = express.Router();

router.get('/api/profile', ProfileController.getProfiles);
router.post(
  '/api/profile',
  validators.findOrCreateProfile,
  ProfileController.findOrCreateProfile
);
