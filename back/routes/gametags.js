const router = require("express").Router();
const gametagsController = require("../controllers/gametags");

router.post("/deleteGameTags", gametagsController.deleteGameTags);
router.post("/createGameTags", gametagsController.createGameTags);

module.exports = router;