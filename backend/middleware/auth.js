const jwt = require("jsonwebtoken");
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
} = require("../controllers/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new INVALID_DATA_ERROR_CODE("contraseña o correo invalidos");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "aqui-va-token");
    console.log(payload);
  } catch (err) {
    throw new INVALID_DATA_ERROR_CODE("contraseña o correo invalidos");
  }
  req.user = payload;
  next();

  //se extrajo el token de la solicitud, falta verificar
};
