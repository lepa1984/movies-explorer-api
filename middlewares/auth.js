const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const extractToken = (header) => header.replace('jwt=', '');
  if (!req.headers.cookie || !req.headers.cookie.startsWith('jwt=')) {
    next(new AuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(extractToken(req.headers.cookie), 'unique-secret-key');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
