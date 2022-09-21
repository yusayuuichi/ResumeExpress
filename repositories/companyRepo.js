class companyRepo {
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
      `SELECT * FROM resume_company WHERE id = ? order by id desc`,
      [id]
    );
  }

  //查user下的company
  getAllByUserId(id) {
    return this.dao.all(
      `SELECT
          rc.id,
          rc.company_name AS companyName,
          rc.company_abb_name AS companyAbbName,
          rc.company_logo AS companyLogo,
          rc.dept_name AS deptName,
          rc."position",
          rc.job_summary AS jobSummary,
          rc.used_skills AS usedSkills,
          rc.begin_date AS beginDate,
          CASE
          WHEN rc.end_date IS NULL THEN "Present"
          ELSE rc.end_date
          END AS endDate
      FROM
          resume_company rc
          LEFT JOIN resume_user_company ruc ON rc.id = ruc.company_id
          LEFT JOIN resume_user ru ON ru.id = ruc.user_id
      WHERE
          1 = 1
          AND ru.id = ?
      ORDER BY
          rc.id DESC;`,
      [id]
    );
  }

  // getAllId() {
  //   return this.dao.all(
  //     `SELECT CAST(id AS TEXT) AS id, type, school, dept, g_year_start, g_year_end, content FROM education order by id desc`
  //   );
  // }

  insert(resumeCompany) {
    const {
      companyName,
      companyAbbName,
      deptName,
      potision,
      jobSummary,
      usedSkills,
      beginDate,
      endDate
    } = resumeCompany;
    return this.dao.run(
      `INSERT INTO resume_company (company_name, company_abb_name, dept_name, 
        position, job_summary, used_skills, begin_date, end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        companyName,
        companyAbbName,
        deptName,
        potision,
        jobSummary,
        usedSkills,
        beginDate,
        endDate
      ]
    );
  }

  update(resumeCompany) {
    const {
      companyName,
      companyAbbName,
      deptName,
      potision,
      jobSummary,
      usedSkills,
      beginDate,
      endDate
    } = resumeCompany;
    return this.dao.run(
      `UPDATE resume_company SET company_name = ?, company_abb_name = ?,
      dept_name = ?, position = ?, job_summary = ?, used_skills = ?, 
      begin_date = ?, end_date = ?
      WHERE id = ?`,
      [
        companyName,
        companyAbbName,
        deptName,
        potision,
        jobSummary,
        usedSkills,
        beginDate,
        endDate
      ]
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM resume_company WHERE id = ?`, [id]);
  }
}

module.exports = companyRepo;
