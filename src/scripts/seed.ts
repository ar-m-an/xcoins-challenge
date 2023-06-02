import mongoose from 'mongoose';

import { DBURL } from '../config';
import { FavoriteModel, ProfileModel, SimulatorModel } from '../models';

(async () => {
  await mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const profile = new ProfileModel({
    name: `String`,
    nickname: `String`,
    email: `String`,
    capital: 123,
    divisa: `String`,
    preferred_cryptocurrency: `String`,
  });
  await profile.save();

  const query = { _id: profile._id };
  const idProfile = await ProfileModel.findOne(query).then((e) => {
    return e?._id;
  });

  const simulator = new SimulatorModel({
    profileId: idProfile,
    name: `String`,
    nickname: `String`,
    cryptocurrency: `String`,
    price: 100,
    euros: 120,
    quantity: 10,
    divisa: `String`,
    dateRecorded: new Date(),
  });
  await simulator.save();

  const favorite = new FavoriteModel({
    profileId: idProfile,
    name: `String`,
    favorites: [`String`],
  });
  await favorite.save();

  await mongoose.disconnect();
})();
