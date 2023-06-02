import express from 'express';

import { ProfileController } from '../controllers';

export const router = express.Router();

router.get('/api/profile', ProfileController.getProfiles);
router.post('/api/profile', ProfileController.findOrCreateProfile);
