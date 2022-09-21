const resume = require("../models/resume");

module.exports = class resumeController {
  getResume(req, res, next) {
    resume().then((result) => res.json(result));
  }
};
