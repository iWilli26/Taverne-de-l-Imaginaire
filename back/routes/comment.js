const router = require("express").Router();
const commentController = require("../controllers/comment");

router.post("/:id", commentController.post);

router.get("/:id", commentController.get);

router.delete("/delete/:id", commentController.suppr);

router.patch("/edit/:id", commentController.edit);

module.exports = router;
