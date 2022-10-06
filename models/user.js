const AppDAO = require("../dao/dao");
const UserRepo = require("../repositories/userRepo");
const Crypto = require("crypto");

const dao = new AppDAO("./database.sqlite3");
const userRepo = new UserRepo(dao);
const secretKey = "ThisIsMyTokenKeyThisIsMyTokenKey";
const iv = "TokensIsVeryLong";

const login = async (param) => {
  const md5 = Crypto.createHash("md5");
  const tokenCipher = Crypto.createCipheriv("aes256", secretKey, iv);

  const { username } = param;
  let { password } = param;
  password = md5.update(password).digest("hex");

  const userInfo = await userRepo.login(username, password);
  const results = {};

  if (userInfo?.username !== username || userInfo?.password !== password) {
    results["result"] = "FAILURE";
    results["msg"] = "使用者帳號密碼錯誤，或不存在";
  } else {
    results["result"] = "SUCCESS";
    results["token"] = tokenCipher.update(
      JSON.stringify(userInfo),
      "utf8",
      "hex"
    );
  }

  return results;
};

module.exports = { login };
