const AppDAO = require("../dao/dao");
const MsgCommentRepo = require("../repositories/msgCommentRepo");

const dao = new AppDAO("./database.sqlite3");
const msgCommentRepo = new MsgCommentRepo(dao);

const getAllMsg = async (index = 0) => {
  const msgList = await msgCommentRepo.getAllMsg(index);

  for (let msg of msgList) {
    const { id } = msg;
    const childs = await msgCommentRepo.getChildMsg(id);
    msg["childs"] = childs;
  }

  const results = {
    msgList
  };
  return results;
};

const addMsg = async (newMsg) => {
  console.log(newMsg);
  return await msgCommentRepo.insert(newMsg);
};

module.exports = {
  getAllMsg,
  addMsg
};
