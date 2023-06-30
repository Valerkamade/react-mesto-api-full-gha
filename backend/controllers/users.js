const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { STATUS_OK, ERROR_CODE_UNIQUE } = require('../utils/constants');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const IncorrectData = require('../errors/incorrect-data');
const NotUniqueData = require('../errors/unique-data');
const { SECRET } = require('../utils/config');

const { ValidationError } = mongoose.Error;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const findById = (req, res, next, id) => {
  User.findById(id)
    .orFail(new NotFoundError(`Пользователь по указанному id: ${id} не найден`))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  findById(req, res, next, userId);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  findById(req, res, next, _id);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_OK).send(user.toJSON()))
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new NotUniqueData('Пользователь с такой почтой уже зарегистрирован'));
      } else if (err instanceof ValidationError) {
        next(new IncorrectData('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUserData = (req, res, next, param) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, param, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  updateUserData(req, res, next, { name, about });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserData(req, res, next, { avatar });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('token')
    .send({ message: 'Выход' });
};
