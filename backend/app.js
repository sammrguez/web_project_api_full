const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require("celebrate");
// app.js

const { PORT = 3000 } = process.env;
const app = express();

// conexion  MONGOdb

mongoose.connect("mongodb://127.0.0.1:27017/aroundapi");
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error de conexión a la base de datos:", err);
});

db.once("open", () => {
  console.log("Conexión exitosa a la base de datos");
});

// importando routers

const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const auth = require("./middleware/auth");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth);
app.use("/", cardsRouter);
app.use("/", usersRouter);

app.use("/", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "se ha producido un error en el servidor" : message,
  });
});
app.listen(PORT, () => {
  console.log(`La aplicación está detectando el puerto ${PORT}`);
});
