const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');

const NotUserError = require('../errors/NotUser');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((movie) => res.send(movie))
    .catch(next);
};
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
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

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params._id;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (String(movie.owner) === String(req.user._id)) {
        movie
          .deleteOne(movie)
          .then(() => res.send(movie))
          .catch(next);
      } else {
        throw new NotUserError('Нельзя удалять чужие фильмы');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
