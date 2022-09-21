class skillRepo {
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

  getById(id) {
    return this.dao.get(
      `SELECT * FROM resume_skill WHERE id = ? order by id desc`,
      [id]
    );
  }

  getAllByUserId(id) {
    return this.dao.all(
      `SELECT
            rs.id,
            skill_type AS skillType,
            skill_name AS skillName,
            skill_logo AS skillLogo
        FROM
            resume_skill rs
            LEFT JOIN resume_user_skill rus ON rus.skill_id = rs.id
            LEFT JOIN resume_user ru ON ru.id = rus.user_id
        WHERE
            1 = 1
            AND ru.id = ?
        ORDER BY
            rs.id ASC;`,
      [id]
    );
  }

  // getAllId() {
  //   return this.dao.all(
  //     `SELECT CAST(id AS TEXT) AS id, type, school, dept, g_year_start, g_year_end, content FROM education order by id desc`
  //   );
  // }

  insert(resumeSkill) {
    const { skillName, skillLogo } = resumeSkill;
    return this.dao.run(
      `INSERT INTO resume_skill (skill_name, skill_logo)
        VALUES (?, ?)`,
      [skillName, skillLogo]
    );
  }

  update(resumeSkill) {
    const { skillName, skillLogo } = resumeSkill;
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

module.exports = skillRepo;
