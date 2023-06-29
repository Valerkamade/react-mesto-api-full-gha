const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');
const { validateUserAuth, validateUserCreate } = require('../utils/validate');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

// Запросы на авторизацию и регистрацию
router.post(
  '/signin',
  validateUserAuth,
  login,
);
router.post(
  '/signup',
  validateUserCreate,
  createUser,
);

// Проверка авторизации
router.use(auth);

// Запросы к серверу по роутам users и cards
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

// .оповещение об ошибке по несуществующим роутам
router.use('*', (req, res, next) => {
  next(new NotFoundError('Что-то где-то пошло как-то не так'));
});

module.exports = router;
