const mongoose = require('mongoose');
const validator = require('validator');

const moviesSchema = new mongoose.Schema({
  nameRu: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  movieId: {
    required: true,
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Не корректный URL',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Не корректный URL',
    },
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Не корректный URL',
    },
  },
  description: {
    required: true,
    type: String,
  },
  year: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  director: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model('movies', moviesSchema);
