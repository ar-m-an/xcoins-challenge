import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { CORS_ORIGINS, DBURL, PORT } from './config';
import { router as favoriteRouter } from './routes/favorite.router';
import { router as profileRouter } from './routes/profile.router';
import { router as simulatorRouter } from './routes/simulator.router';

mongoose
  .connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to DB ${DBURL}`);
  });

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

app.listen(PORT, () =>
  console.log(`✅  Ready on port http://localhost:${PORT}`)
);
