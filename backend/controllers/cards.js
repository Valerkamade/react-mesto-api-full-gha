const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const IncorrectData = require('../errors/incorrect-data');
const NotAccess = require('../errors/not-access');
const { STATUS_OK } = require('../utils/constants');

const { ValidationError } = mongoose.Error;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(STATUS_OK).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectData('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

function updateCard(req, res, next, operation) {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    operation,
    { new: true },
  ).orFail(new NotFoundError(`Передан не существующий id:${cardId} карточки`))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

module.exports.likeCard = (req, res, next) => {
  const { _id } = req.user;
  updateCard(req, res, next, { $addToSet: { likes: _id } });
};

module.exports.dislikeCard = (req, res, next) => {
  const { _id } = req.user;
  updateCard(req, res, next, { $pull: { likes: _id } });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findById(cardId)
    .orFail(new NotFoundError(`Передан не существующий id:${cardId} карточки`))
    .then((card) => {
      if (card.owner.toString() !== _id) {
        return Promise.reject(new NotAccess('Нельзя удалять чужие карточки'));
      }
      return Card.deleteOne(card)
        .then(() => res.send({ message: 'Пост удалён' }));
    })
    .catch(next);
};
