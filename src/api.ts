import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { CORS_ORIGINS, DBURL, PORT } from './config';
import { router as favoriteRouter } from './routes/favorite.router';
import { router as profileRouter } from './routes/profile.router';
import { router as simulatorRouter } from './routes/simulator.router';
import { logger } from './common/logger';

mongoose
  .connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info(`Connected to DB ${DBURL}`);
  });

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

const server = app.listen(PORT, () =>
  logger.info(`✅  Ready on port http://localhost:${PORT}`)
);

export default server;
