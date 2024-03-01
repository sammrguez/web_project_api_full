const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;

const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("./errors");

module.exports.getUsers = (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new UNAUTHORIZED_ERROR_CODE(
      "No tienes autorización para acceder a esta contenido"
    );
  }
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      throw new SERVER_ERROR_CODE(
        "ocurrió durante la ejecución del código, pero lo hemos manejado"
      );
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.user._id;
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
      throw new NOT_FOUND_CODE("No se ha encontrado ningún user con esa id");
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => {
      res.send({ data: user });
    })

    .catch((err) => {
      console.log(err);
      throw new ERROR_CODE("los datos proporcionados son incorrectos");
    });
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new UNAUTHORIZED_ERROR_CODE(
      "No tienes autorización para acceder a esta contenido"
    );
  }
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
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
      throw new NOT_FOUND_CODE("No se ha encontrado ningún user con esa id");
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new UNAUTHORIZED_ERROR_CODE(
      "No tienes autorización para acceder a esta contenido"
    );
  }
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
      throw new NOT_FOUND_CODE("No se ha encontrado ningún user con esa id");
    });
};

module.exports.login = (req, res) => {
  console.log("se recibio una solicitud n login");
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log("bienvenido, desde users controller, te envio el");
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      throw new INVALID_DATA_ERROR_CODE("contraseña o correo invalidos");
    });
};

module.exports.myProfile = (req, res) => {
  console.log("me esta llegando una peticion");
  const userId = req.user._id;
  if (!userId) {
    throw new UNAUTHORIZED_ERROR_CODE(
      "No tienes autorización para acceder a esta contenido"
    );
  }

  User.findById(userId)
    .orFail(() => {
      const error = new UNAUTHORIZED_ERROR_CODE(
        "No tienes autorización para acceder a esta contenido"
      );
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch(() => {
      throw new UNAUTHORIZED_ERROR_CODE(
        "No tienes autorización para acceder a esta contenido"
      );
    });
};
