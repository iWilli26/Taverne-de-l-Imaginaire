const router = require("express").Router();
const tagController = require("../controllers/tag");

router.get("/", tagController.getAll);
router.get("/:id", tagController.getTag);
module.exports = router;
