const AppDAO = require("../dao/dao");
const UserRepo = require("../repositories/userRepo");
const crypto = require("crypto");

const dao = new AppDAO("./database.sqlite3");
const userRepo = new UserRepo(dao);

const login = async (param) => {
  const md5 = crypto.createHash("md5");
  const { username, password } = param;
  password = md5.update(password).digest("hex");
  console.log(password);
  const userInfo = await userRepo.login(username, password);
  const results = {
    userInfo,
  };
  return results;
};

module.exports = { login };
