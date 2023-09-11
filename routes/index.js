const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

const { createUser, login } = require('../controllers/users');
const { validLogin, validCreateUser } = require('../middlewares/validation');

router.post('/sign-in', validLogin, login);
router.post('/sign-up', validCreateUser, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', auth, (req, res, next) => {
  next(new NotFound('404: Страница не найдена.'));
});

module.exports = router;
