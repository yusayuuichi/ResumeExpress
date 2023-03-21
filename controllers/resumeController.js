const resume = require("../models/resume");

module.exports = class resumeController {
  getResume(req, res, next) {
    // 取得履歷資料
    resume.getResume().then((result) => res.json(result));
  }

  update(req, res, next) {
    resume.update(req.body).then((result) => {
      if (result.changes > 0) {
        console.log("update success");
        result["result"] = true;
        res.json(result);
      }
    });
  }
};
