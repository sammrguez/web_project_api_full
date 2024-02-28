const jwt = require("jsonwebtoken");
require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;

const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
} = require("../controllers/errors");

module.exports = (req, res, next) => {
  console.log(req.body);
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new INVALID_DATA_ERROR_CODE("contraseña o correo invalidos");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log(payload);
  } catch (err) {
    throw new INVALID_DATA_ERROR_CODE("contraseña o correo invalidos");
  }
  req.user = payload;
  res.send(req.user.payload);
  next();

  //se extrajo el token de la solicitud, falta verificar
};
