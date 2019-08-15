import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const { Schema } = mongoose;
const MovieSchema = new Schema(
  {
    title: { 
      type: String,
      required: true,
    },
    poster: { type: String },
    overview: { type: String },
    release: { type: String },
    imdb_id: { type: String },
    vote_average: { type: Number },
    country: { type: String },
    backdropPhoto: { type: String},
    video: { type: [{
      key: { type: String },
      value: {type: String }
    }] },
    genres: { type: [{
      _id: { type: Number },
      name: { type: String },
    }] },
    reviews: { type: [{
      userId: { type: String},
      userName: { type: String },
      avatar: { type: String },
      comment: { type: String },
      rating: { type: Number},
    }]},
  },
  { timestamps: true },
);

MovieSchema.plugin(uniqueValidator);

export default mongoose.model('movies', MovieSchema);