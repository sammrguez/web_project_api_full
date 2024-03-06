const Card = require("../models/card");
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../middleware/errors");

module.exports.getCards = (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new UNAUTHORIZED_ERROR_CODE(
      "No tienes autorización para acceder a esta contenido"
    );
  }
  Card.find({})
    .orFail()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: "ha ocurrido un error en el servidor" });
    });
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  console.log("estas intentando crear una card");
  if (!userId) {
    throw new UNAUTHORIZED_ERROR_CODE(
      "No tienes autorización para acceder a esta contenido"
    );
  }
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })

    .then((card) => {
      res.send(card);
    })

    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res
        .status(ERROR_CODE)
        .send({ message: "los datos proporcionados no son válidos" });
    });
};

module.exports.deleteCard = (req, res) => {
  console.log(req.params);
  const userId = req.user._id;
  const cardId = req.params.cardId;
  if (!userId) {
    throw new UNAUTHORIZED_ERROR_CODE(
      "No tienes autorización para acceder a esta contenido"
    );
  }
  Card.findById(cardId).then((card) => {
    const cardOwner = card.owner;

    if (!card) {
      throw new UNAUTHORIZED_ERROR_CODE(
        "No tienes autorización para acceder a esta contenido"
      );
    }
    if (cardOwner.toString() !== userId.toString()) {
      throw new UNAUTHORIZED_ERROR_CODE("no eres dueno de esta card");
    } else {
      Card.findByIdAndDelete(cardId)
        .then((deletedCard) => {
          res.send(deletedCard);
        })
        .catch((err) => {
          console.log(err);
          throw new UNAUTHORIZED_ERROR_CODE("no se pudo eliminar");
        });
    }
  });
};

module.exports.likeCard = (req, res) => {
  const cardId = req.params.cardId;
  const idLike = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: idLike } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log("ID de tarjeta no encontrado");
      res.status(NOT_FOUND_CODE).send({ message: err.message });
    });
};
module.exports.dislikeCard = (req, res) => {
  const cardId = req.params.cardId;
  const idLike = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: idLike } }, { new: true })
    .then((card) => {
      if (!card) {
        console.log("Tarjeta no encontrada");
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Tarjeta no encontrada" });
      }
      res.send(card);
    })
    .catch((err) => {
      console.log("Error al quitar el like de la tarjeta");
      res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};
