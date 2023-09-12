const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const NotUserError = require('../errors/NotUser');

const createMovie = (req, res, next) => {
  const newMoviesData = req.body;
  return Movie.create({
    country: newMoviesData.country,
    director: newMoviesData.director,
    duration: newMoviesData.duration,
    year: newMoviesData.year,
    description: newMoviesData.description,
    image: newMoviesData.image,
    trailerLink: newMoviesData.trailerLink,
    trailer: newMoviesData.trailer,
    owner: req.user.id,
    nameRU: newMoviesData.nameRU,
    nameEN: newMoviesData.nameEN,
    thumbnail: newMoviesData.thumbnail,
    movieId: newMoviesData.movieId,
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
  Movie.find({ owner: req.user.id })
    .then((movie) => res.send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
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
