var express = require("express");
var router = express.Router();

const UserController = require("../controllers/userController");
const userController = new UserController();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", userController.login);

module.exports = router;
