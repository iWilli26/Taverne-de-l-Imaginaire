const router = require("express").Router();
const localisationController = require("../controllers/localisation");

router.get("/", localisationController.getAll);

router.post("/create", localisationController.createLocalisation);

router.post("/delete", localisationController.deleteLocalisation);

router.post("/update", localisationController.updateLocalisation);

module.exports = router;