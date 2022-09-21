class msgCommentRepo {
  constructor(dao) {
    this.dao = dao;
  }

  // createTable() {
  //   const sql = `
  //   CREATE TABLE IF NOT EXISTS education (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     type TEXT,
  //     school TEXT,
  //     dept TEXT,
  //     g_year_start TEXT,
  //     g_year_end TEXT,
  //     content TEXT)`;
  //   return this.dao.run(sql);
  // }

  getAllMsg(index) {
    return this.dao.all(
      `SELECT * FROM msg_comments mc
      WHERE parent_id = 0
      LIMIT 10 OFFSET ?;`,
      [index]
    );
  }

  getChildMsg(id) {
    return this.dao.all(
      `SELECT * FROM msg_comments mc 
      WHERE parent_id = ?;`,
      [id]
    );
  }

  // getAllId() {
  //   return this.dao.all(
  //     `SELECT CAST(id AS TEXT) AS id, type, school, dept, g_year_start, g_year_end, content FROM education order by id desc`
  //   );
  // }

  insert(msg) {
    const { parentId, nickName, comment } = msg;
    return this.dao.run(
      `INSERT INTO msg_comments (parent_id, nick_name, comment)
        VALUES (?, ?, ?)`,
      [parentId, nickName, comment]
    );
  }

  update(msg) {
    const { skillName, skillLogo } = msg;
    return this.dao.run(
      `UPDATE resume_skill SET skill_name = ?, skill_logo = ? 
      WHERE id = ?`,
      [skillName, skillLogo]
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM resume_skill WHERE id = ?`, [id]);
  }
}

module.exports = msgCommentRepo;
