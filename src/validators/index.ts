import Joi from 'joi';
import { validate } from 'express-validation';

const getFavoriteByProfile = validate(
  {
    params: Joi.object({
      profile_id: Joi.string().required(),
    }),
  },
  { keyByField: true }
);

const findOrCreateProfile = validate(
  {
    body: Joi.object({
      name: Joi.string().required(),
      nickname: Joi.string().required(),
      email: Joi.string().email().required(),
      capital: Joi.number().positive().optional(),
      divisa: Joi.string().optional(),
      preferred_cryptocurrency: Joi.string().optional(),
    }).required(),
  },
  { keyByField: true }
);

const getSimulatorByProfile = validate(
  {
    params: Joi.object({
      profile_id: Joi.string().required(),
    }),
  },
  { keyByField: true }
);

const createSimulator = validate(
  {
    params: Joi.object({
      profile_id: Joi.string().required(),
    }),
    body: Joi.object({
      dateRecorded: Joi.date().required(),
      euros: Joi.number().positive().required(),
      price: Joi.number().positive().required(),
      quantity: Joi.number().positive().required(),
      cryptocurrency: Joi.string().required(),
    }).required(),
  },
  { keyByField: true }
);

export default {
  getFavoriteByProfile,
  findOrCreateProfile,
  getSimulatorByProfile,
  createSimulator,
};
