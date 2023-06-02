import { Router } from 'express';

import { FavoriteController } from '../controllers';

export const router = Router();

router.get('/api/favorite', FavoriteController.getFavorites);
router.get(
  '/api/favorite/:profile_id',
  FavoriteController.getFavoritesByProfile
);
