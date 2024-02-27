const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.use(auth);
router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);
router.put("/cards/:id/likes", likeCard);
router.delete("/cards/:id/likes", dislikeCard);
module.exports = router;
