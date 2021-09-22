import mongoose from 'mongoose';
import validator from 'validator';
import { userModelConstants, movieModelConstants, common } from '../utils/constants.js';

const urlValidation = {
  validator(value) {
    return validator.isURL(value, { require_protocol: true });
  },
  message: (props) => `${props.value} ${common.isNotA} ${common.urlString}`,
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: urlValidation,
  },
  trailer: {
    type: String,
    required: true,
    validate: urlValidation,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: urlValidation,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModelConstants.modelName,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

export default mongoose.model(movieModelConstants.modelName, movieSchema);
