const router = require("express").Router();
const copyController = require("../controllers/copy");

router.get("/", copyController.getAll);

router.get("/getTransfo", copyController.getAllwithTransfo);

router.post("/create", copyController.createCopy);

router.post("/delete", copyController.deleteCopy);

router.post("/update", copyController.updateCopy);

module.exports = router;