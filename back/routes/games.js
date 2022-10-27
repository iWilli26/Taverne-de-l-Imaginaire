const router = require("express").Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getGame);
module.exports = router;
