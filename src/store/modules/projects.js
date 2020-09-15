import db from "../../firebaseConfig.js";

const state = {
  projects: [],
};

const getters = {
  projects: (state) => state.projects,
};

const mutations = {
  newProject: (state, project) => state.projects.unshift(project),
};

const actions = {
  async getProjects({ commit }) {
    await db.projects.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //console.log(doc.id, "=>", doc.data())
        commit("newProject", {
          id: doc.id,
          name: doc.data().name,
          repoUrl: doc.data().repoUrl,
          siteUrl: doc.data().siteUrl,
          progress: doc.data().state,
          desc: doc.data().desc,
          collaborators: doc.data().collaborators,
        });
        console.log(doc.data().name);
      });
    });
  },
  async newProject(project) {
    await db.projects
      .doc()
      .set({
        name: project.name,
        repoUrl: project.repoUrl,
        siteUrl: project.Url,
        progress: project.state,
        desc: project.desc,
        collaborators: project.collaborators,
      })
      .then(function(doc) {
        console.log(doc);
      })
      .catch(function(error) {
        console.error("An error occured adding the project: ", error);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
