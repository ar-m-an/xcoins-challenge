import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface ISimulator extends mongoose.Document {
  profileId: mongoose.Types.ObjectId;
  dateRecorded: Date;
  cryptocurrency: string;
  euros: number;
  price: number;
  quantity: number;
}

const schema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
    dateRecorded: {
      type: Date,
      required: true,
    },
    cryptocurrency: {
      type: String,
      required: true,
      trim: true,
    },
    euros: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SimulatorModel = mongoose.model<ISimulator>('SimulatorModel', schema);

export default SimulatorModel;
