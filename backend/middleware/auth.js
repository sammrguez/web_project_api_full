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
  const { authorization } = req.headers;

  // console.log(
  //   `esto es la autorizacion desde auth middleware: ${authorization}`
  // );

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new INVALID_DATA_ERROR_CODE(
      "contraseña o correo invalidos o no hay autorizacion"
    );
  }
  const token = authorization.replace("Bearer ", "");
  console.log(`enviando token desde fuera de try: ${token}`);
  let payload;

  try {
    console.log(`enviando token dentro de try:${token}`);
    console.log(` clave secreta dessde autorization:${JWT_SECRET}`);
    payload = jwt.verify(token, JWT_SECRET);
    console.log(`id decifrado: ${payload}`);
  } catch (err) {
    console.log(err);
    throw new INVALID_DATA_ERROR_CODE("contraseña o correo invalidos");
  }
  req.user = payload;
  res.send(req.user.payload);
  next();

  //se extrajo el token de la solicitud, falta verificar
};
