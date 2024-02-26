const mongoose = require("mongoose");

const regExpLink = /^(https?:\/\/)(www\.)?[\w~:/?%#[\]@!$&'.()*+,;=]*\/#?/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return regExpLink.test(v);
      },
    },
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
