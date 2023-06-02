import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { CORS_ORIGINS } from './config';
import { router as favoriteRouter } from './routes/favorite.router';
import { router as profileRouter } from './routes/profile.router';
import { router as simulatorRouter } from './routes/simulator.router';

const app = express();

app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

export default app;
