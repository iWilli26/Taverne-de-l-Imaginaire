const router = require("express").Router();
const tagController = require("../controllers/tag");

router.get("/games", tagController.getAllwithGames);
router.get("/:id", tagController.getTag);
router.get("/", tagController.getAll);
module.exports = router;
