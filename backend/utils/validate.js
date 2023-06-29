const { celebrate, Joi, Segments } = require('celebrate');

const regex = /^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/;

module.exports.validateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateUserAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),
  }),
});

module.exports.validateUserID = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCardID = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});

module.exports.validateUserCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
});

module.exports.validateUserAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
