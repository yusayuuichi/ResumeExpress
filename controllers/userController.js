const user = require("../models/user");

const title = "登入";

module.exports = class userController {
  login(req, res, next) {
    user.login(req.body).then((results) => {
      res.json(results);
    });
  }

  //   tokenCheck(req, res, next) {
  //     msg.getAllMsg().then((result) => res.json(result));
  //   }
};
