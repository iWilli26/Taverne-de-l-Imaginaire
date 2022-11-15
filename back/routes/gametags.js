const router = require("express").Router();
const gametagsController = require("../controllers/gametags");

router.post("/updateGameTags", gametagsController.updateGameTags);

module.exports = router;