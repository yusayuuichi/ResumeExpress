const AppDAO = require("../dao/dao");
const UserRepo = require("../repositories/userRepo");
const CompanyRepo = require("../repositories/companyRepo");
const ProjectRepo = require("../repositories/projectRepo");
const SkillRepo = require("../repositories/skillRepo");

const dao = new AppDAO("./database.sqlite3");

const getResume = async () => {
  const userRepo = new UserRepo(dao);
  const companyRepo = new CompanyRepo(dao);
  const projectRepo = new ProjectRepo(dao);
  const skillRepo = new SkillRepo(dao);

  const resume = {};
  resume["info"] = await userRepo.getById(1);

  const companyList = await companyRepo.getAllByUserId(1);
  const companyIdList = companyList.map((company) => company.id);
  const projectList = await projectRepo.getAllByCompanyIds(companyIdList);

  companyList.forEach((company) => {
    const projects = [];
    projectList.forEach((project) => {
      console.log("p", project);
      if (company.id === project.companyId) {
        projects.push(project);
      }
    });
    company["project"] = projects;
  });
  resume["company"] = companyList;

  //resume["project"]

  resume["skill"] = await skillRepo.getAllByUserId(1);
  return resume;
};

const update = async (data) => {
  const userRepo = new UserRepo(dao);
  const { userInfoEditor } = data;

  let result = await userRepo.update(userInfoEditor);
  if (result?.changes < 1) {
    return result;
  }

  return result;
};

module.exports = {
  getResume,
  update,
};
