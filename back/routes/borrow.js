const router = require("express").Router();
const borrowController = require("../controllers/borrow");

router.post("/", borrowController.post);

module.exports = router;
