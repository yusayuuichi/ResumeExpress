class userRepo {
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
      `SELECT
            id,
            "name",
            eng_name AS engName,
            job_title AS jobTitle,
            introduction,
            school,
            "location",
            email,
            phone,
            linkedin,
            cakeresume,
            work_now AS workNow,
            figure
        FROM
            resume_user
        WHERE
            id = ?
        order by
            id desc`,
      [id]
    );
  }

  // getAllId() {
  //   return this.dao.all(
  //     `SELECT CAST(id AS TEXT) AS id, type, school, dept, g_year_start, g_year_end, content FROM education order by id desc`
  //   );
  // }

  insert(resumeUser) {
    const {
      name,
      engName,
      jobTitle,
      introduction,
      location,
      email,
      phone
    } = resumeUser;
    return this.dao.run(
      `INSERT INTO resume_user (name, eng_name, job_title, introduction, 
        location, email, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, engName, jobTitle, introduction, location, email, phone]
    );
  }

  update(education) {
    const {
      name,
      engName,
      jobTitle,
      introduction,
      location,
      email,
      phone
    } = education;
    return this.dao.run(
      `UPDATE resume_user SET name = ?, eng_name = ?, job_title = ?, 
      introduction = ?, location = ?, email = ?, phone = ? 
      WHERE id = ?`,
      [name, engName, jobTitle, introduction, location, email, phone]
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM resume_user WHERE id = ?`, [id]);
  }
}

module.exports = userRepo;
