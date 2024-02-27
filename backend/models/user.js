const mongoose = require("mongoose");

const regExpLink = /^(https?:\/\/)(www\.)?[\w~:/?%#[\]@!$&'.()*+,;=]*\/#?/;
const regExpEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return regExpLink.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return regExpEmail.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model("user", userSchema);
