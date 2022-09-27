const user = require("../models/user");

module.exports = class userController {
  login(req, res, next) {
    console.log(req.body);
    user.login(req.body).then((result) => res.json(result));
  }

  //   tokenCheck(req, res, next) {
  //     msg.getAllMsg().then((result) => res.json(result));
  //   }
};
