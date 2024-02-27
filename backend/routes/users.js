const router = require("express").Router();

const {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);
router.post("/login", login);
module.exports = router;
