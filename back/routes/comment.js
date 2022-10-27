const router = require("express").Router();
const commentController = require("../controllers/comment");

router.post("/:id", commentController.post);

router.get("/:id", commentController.get);

module.exports = router;
