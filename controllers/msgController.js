const msg = require("../models/msg");

module.exports = class msgController {
  getAllMsg(req, res, next) {
    msg.getAllMsg().then((result) => res.json(result));
  }

  addMsg(req, res, next) {
    msg.addMsg(req.body).then((result) => {
      console.log(result);
      if (result.changes > 0) {
        result["result"] = true;
        res.json(result);
      }
    });
  }
};
