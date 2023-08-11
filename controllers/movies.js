const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const NotUserError = require('../errors/NotUser');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    owner,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден.');
      } else if (req.user._id !== movie.owner.toString()) {
        throw new NotUserError('Нельзя удалять чужие фильмы.');
      }
      Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные  '));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
