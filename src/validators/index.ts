import Joi from 'joi-oid';
import { validate } from 'express-validation';
import { string } from 'joi';

const getFavoriteByProfile = validate(
  {
    params: Joi.object({
      profile_id: Joi.objectId().required(),
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
      preferred_cryptocurrency: string().optional(),
    }).required(),
  },
  { keyByField: true }
);

const getSimulatorByProfile = validate(
  {
    params: Joi.object({
      profile_id: Joi.objectId().required(),
    }),
  },
  { keyByField: true }
);

const createSimulator = validate(
  {
    params: Joi.object({
      profile_id: Joi.objectId().required(),
    }),
    body: Joi.object({
      dateRecorded: Joi.date().required(),
      euros: Joi.number().positive().required(),
      price: Joi.number().positive().required(),
      quantity: Joi.number().positive().required(),
      cryptocurrency: string().required(),
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
