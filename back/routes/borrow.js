const router = require("express").Router();
const borrowController = require("../controllers/borrow");

router.post("/", borrowController.post);

router.get("/getTransfo", borrowController.getReturnWithTransfo);

module.exports = router;
