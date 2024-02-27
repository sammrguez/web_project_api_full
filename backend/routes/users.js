const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.use(auth);

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);
module.exports = router;
