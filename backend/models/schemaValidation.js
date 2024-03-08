const { Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const createUserValidator = Joi.object.keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateProfileValidator = Joi.object.keys({
  name: Joi.string().required(),
  about: Joi.string().required(),
});

const updateAvatarValidator = Joi.object.keys({
  link: Joi.string().required().custom(validateURL),
});
const loginValidator = Joi.object.keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const createCardValidator = Joi.object.keys({
  name: Joi.string().required(),
  about: Joi.string().required().custom(validateURL),
});
