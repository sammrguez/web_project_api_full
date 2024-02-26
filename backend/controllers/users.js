const User = require("../models/user");

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res.status(SERVER_ERROR_CODE).send({ message: err.name });
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.params._id;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(NOT_FOUND_CODE)
        .send({ message: "No se ha encontrado ningún user con esa id" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })

    .then((user) => {
      res.send({ data: user });
    })

    .catch(() => {
      res
        .status(ERROR_CODE)
        .send({ message: "los datos proporcionados no son válidos" });
    });
};

module.exports.updateProfile = (req, res) => {
  console.log(req.user._id);
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res
        .status(NOT_FOUND_CODE)
        .send({ message: "No se ha encontrado ningún user con esa id" });
    });
};
module.exports.updateAvatar = (req, res) => {
  console.log(req.user._id);
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res
        .status(NOT_FOUND_CODE)
        .send({ message: "No se ha encontrado ningún user con esa id" });
    });
};
