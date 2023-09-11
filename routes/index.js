const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', auth, (req, res, next) => {
  next(new NotFound('404: Страница не найдена.'));
});

module.exports = router;
