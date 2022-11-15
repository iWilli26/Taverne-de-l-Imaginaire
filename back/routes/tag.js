const router = require("express").Router();
const tagController = require("../controllers/tag");

router.get("/games", tagController.getAllwithGames);
router.get("/:id", tagController.getTag);
router.get("/", tagController.getAll);
router.post("/create", tagController.createTag);
router.post("/update", tagController.updateTag);
router.post("/delete", tagController.deleteTag);
module.exports = router;
