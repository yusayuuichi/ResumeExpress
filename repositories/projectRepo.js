class projectRepo {
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
      `SELECT * FROM resume_project WHERE id = ? order by id desc`,
      [id]
    );
  }

  getAllByCompanyIds(companyIdList) {
    const arr = new Array(companyIdList.length).fill("?").toString();

    return this.dao.all(
      `SELECT
            id, company_id AS companyId, project_name AS projectName, "desc"
        FROM
            resume_project
        WHERE
            1 = 1
            AND company_id IN (${arr})
        ORDER BY
            company_id DESC,id DESC;`,
      companyIdList
    );
  }

  insert(resumeProject) {
    const { companyId, projectName, desc } = resumeProject;
    return this.dao.run(
      `INSERT INTO resume_project (company_id, project_name, desc)
        VALUES (?, ?, ?)`,
      [companyId, projectName, desc]
    );
  }

  update(resumeProject) {
    const { companyId, projectName, desc } = resumeProject;
    return this.dao.run(
      `UPDATE resume_project SET company_id = ?, project_name = ?,
      desc = ?
      WHERE id = ?`,
      [companyId, projectName, desc]
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM resume_project WHERE id = ?`, [id]);
  }
}

module.exports = projectRepo;
