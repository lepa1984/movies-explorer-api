const router = require('express').Router();
const {
  moviesCreateValidator,
  moviesIdValidator,
} = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', moviesCreateValidator, createMovie);
router.delete('/:cardId', moviesIdValidator, deleteMovie);
module.exports = router;
