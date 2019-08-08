import mongoose from 'mongoose';

const { Schema } = mongoose;
const Movie = new Schema(
  {
    title: { type: String },
    poster: { type: String },
    overview: { type: String },
    release: { type: String },
    imdb_id: { type: String },
    vote_average: { type: Number },
    country: { type: String },
    backdropPhoto: { type: String},
    video: {
      id: {type: String },
      key: { type: String },
      value: {type: String }
    },
    genres: { type: [{
      id: { type: Number },
      name: { type: String },
    }] },
    reviews: {
      id: { type: String },
      userId: { type: String},
      userName: { type: String },
      avatar: { type: String },
      comment: { type: String },
      rating: { type: Number},
    }
  },
  { timestamps: true },
);

export default mongoose.model('movies', Movie);