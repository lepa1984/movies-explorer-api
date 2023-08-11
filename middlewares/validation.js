const { celebrate, Joi } = require("celebrate");

const validCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .regex(
        /^:?https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/
      ),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const moviesCreateValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailerLink: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const moviesIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validLogin,
  validCreateUser,
  userUpdateValidator,
  userAvatarValidator,
  userIdValidator,
  moviesCreateValidator,
  moviesIdValidator,
};
