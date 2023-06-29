const router = require('express').Router();
const { validateUser, validateUserID, validateUserAvatar } = require('../utils/validate');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // запросить пользователей
router.get('/me', getCurrentUser); // запросить информацию об активном пользователе
router.get( // запросить пользователя по id
  '/:userId',
  validateUserID,
  getUser,
);
router.patch( // изменить данные пользователя name и about
  '/me',
  validateUser,
  updateUserProfile,
);
router.patch( // изменить аватар пользователя
  '/me/avatar',
  validateUserAvatar,
  updateUserAvatar,
);

module.exports = router;
