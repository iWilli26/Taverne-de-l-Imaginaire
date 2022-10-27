const router = require("express").Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getGame);

router.post("/create", gamesController.createGame);

router.post("/delete", gamesController.deleteGame);

router.post("/update", gamesController.updateGame);

module.exports = router;
