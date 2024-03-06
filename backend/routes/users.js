const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");
const auth = require("../middleware/auth");

const {
  getUsers,
  updateProfile,
  updateAvatar,
  myProfile,
} = require("../controllers/users");

router.use(
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string()
        .required()
        .regex(/^Bearer \S+$/),
    }).unknown(),
  })
);
router.use(auth);

router.get("/users", getUsers);
router.get("/users/me", myProfile);

router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);
module.exports = router;
