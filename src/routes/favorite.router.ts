import { Router } from 'express';

import { FavoriteController } from '../controllers';
import validators from '../validators';

export const router = Router();

router.get('/api/favorite', FavoriteController.getFavorites);
router.get(
  '/api/favorite/:profile_id',
  validators.getFavoriteByProfile,
  FavoriteController.getFavoritesByProfile
);
