const { Joi, celebrate, Segments, errors } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

//user validations

const createUserValidation = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginValidation = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const updateProfileValidation = Joi.object().keys({
  name: Joi.string().required(),
  about: Joi.string().required(),
});

const updateAvatarValidation = Joi.object().keys({
  avatar: Joi.string().required().custom(validateURL),
});
