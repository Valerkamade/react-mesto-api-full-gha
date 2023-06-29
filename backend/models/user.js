const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const NotFoundAuth = require('../errors/not-found-auth');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  name: { // имя пользователя: строка длиной от 2 до 30 символов, по умолчанию Жак-Ив Кусто
    type: String,
    minlength: [2, 'Слишком короткое имя'],
    maxlength: [30, 'Слишком длинное имя'],
    default: 'Жак-Ив Кусто',
  },
  about: { // информация о пользователе: строка от 2 до 30 символов, по умолчанию Исследователь
    type: String,
    minlength: [2, 'Маловато символов о себе'],
    maxlength: [30, 'Многовато символов о себе'],
    default: 'Исследователь',
  },
  avatar: { // ссылка на аватар пользователя: строка, имеет значение по усолчанию
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введен некорректный адрес url',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: { // обязателдьное поле почта: уникальная строка
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Введен некорректный адрес почты',
    },
    required: true,
    unique: true,
  },
  password: { // обязательное поле пароль: строка длиной от 8 символов, не передавать в схеме
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundAuth('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotFoundAuth('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
