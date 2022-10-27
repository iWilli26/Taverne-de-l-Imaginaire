const router = require("express").Router();
const usersController = require("../controllers/users");

router.get("/", usersController.getAll);

router.post("/create", usersController.createUser);

router.post("/delete", usersController.deleteUser);

router.post("/update", usersController.updateUser);

module.exports = router;