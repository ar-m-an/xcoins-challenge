import { connectDb } from './common/db';
import { PORT } from './config';
import { logger } from './common/logger';
import app from './api';

connectDb()
  .then(() => app.listen(PORT))
  .then(() => logger.info(`✅  Ready on port http://localhost:${PORT}`));
