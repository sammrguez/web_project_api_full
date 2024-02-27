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
  //se extrajo el token de la solicitud, falta verificar
};
