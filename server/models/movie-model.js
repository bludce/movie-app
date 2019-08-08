import mongoose from 'mongoose';

const { Schema } = mongoose;
const Movie = new Schema(
  {
    name: { type: String},
    time: { type: [String]},
    rating: { type: Number },
  },
  { timestamps: true },
);

export default mongoose.model('movies', Movie);