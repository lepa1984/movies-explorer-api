const router = require('express').Router();
const { userUpdateValidator } = require('../middlewares/validation');
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { createUser, login } = require('../controllers/users');
const { validLogin, validCreateUser } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.use('/sign-in', validLogin, login);
router.use('/sign-up', validCreateUser, createUser);
router.use(auth);
router.get('/me', getUserInfo);
router.patch('/me', userUpdateValidator, updateUserInfo);

module.exports = router;
