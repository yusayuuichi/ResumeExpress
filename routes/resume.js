const express = require("express");
const router = express.Router();

const ResumeController = require("../controllers/resumeController");
const resumeController = new ResumeController();

/* GET resume data. */
// router.get("/", function (req, res, next) {
//   console.log("test123");
//   res.json({ data: "test" });
// });

router.get("/me", resumeController.getResume);
router.post("/update", resumeController.update);

module.exports = router;
