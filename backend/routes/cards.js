const router = require('express').Router();
const { validateCard, validateCardID } = require('../utils/validate');
const {
  getCards,
  deleteCard,
  createCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

router.get('/', getCards); // запросить карточки
router.post(
  '/',
  validateCard,
  createCard,
); // создать карточку
router.put('/:cardId/likes', validateCardID, likeCard); // поставить лайк
router.delete('/:cardId/likes', validateCardID, dislikeCard); // удалить лайк
router.delete('/:cardId', validateCardID, deleteCard); // удалить карточку

module.exports = router;
