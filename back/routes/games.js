const router = require("express").Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.getAll);

router.post("/create", gamesController.createGame);

router.post("/delete", gamesController.deleteGame);

router.post("/update", gamesController.updateGame);

module.exports = router;
