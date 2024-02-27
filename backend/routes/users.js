const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
} = require("../controllers/users");

router.post("/users", createUser);
router.post("/login", login);

router.use(auth);

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);
module.exports = router;
