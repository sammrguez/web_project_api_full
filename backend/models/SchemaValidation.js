const { Joi, celebrate, Segments, errors } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const createUserValidation = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().require(),
});

const updateProfileValidation = Joi.object().keys({
  name: Joi.string().require(),
  about: Joi.string().require(),
});

const updateAvatarValidation = Joi.object().keys({
  avatar: Joi.string().required().custom(validateURL),
});
