const router = require("express").Router();
const gamesController = require("../controllers/games");

router.get("/", gamesController.getAll);

module.exports = router;
