const express = require("express");
const router = express.Router();

const MsgController = require("../controllers/msgController");
const msgController = new MsgController();

/* GET resume data. */
// router.get("/", function (req, res, next) {
//   console.log("test123");
//   res.json({ data: "test" });
// });

router.get("/all", msgController.getAllMsg);
router.post("/add", msgController.addMsg);

module.exports = router;
