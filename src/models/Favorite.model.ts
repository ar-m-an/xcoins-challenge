import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IFavorite extends mongoose.Document {
  profileId: mongoose.Types.ObjectId;
  name: string;
  favorites: Array<string>;
}

const schema = new Schema(
  {
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    favorites: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model<IFavorite>('FavoriteModel', schema);

export default FavoriteModel;
