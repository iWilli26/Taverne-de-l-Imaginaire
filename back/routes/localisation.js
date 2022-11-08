const router = require("express").Router();
const localisationController = require("../controllers/localisation");

router.get("/", localisationController.getAll);

module.exports = router;