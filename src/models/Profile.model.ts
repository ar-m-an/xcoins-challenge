import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IProfile extends mongoose.Document {
  name: string;
  nickname: string;
  email: string;
  capital?: number;
  divisa?: string;
  preferred_cryptocurrency?: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  capital: {
    type: Number,
    default: 0,
  },
  divisa: {
    type: String,
    trim: true,
  },
  preferred_cryptocurrency: {
    type: String,
    trim: true,
  },
});

const ProfileModel = mongoose.model<IProfile>('ProfileModel', schema);

export default ProfileModel;
