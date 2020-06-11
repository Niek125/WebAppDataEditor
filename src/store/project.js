import ApiService from "../services/ApiService";

export default {
  namespaced: true,
  state: {
    id: "",
    projectName: "",
    messages: [],
    editors: [],
  },
  mutations: {
    SET_PROJECT_NAME(state, payload) {
      state.projectName = payload;
    },
    SET_MESSAGES(state, payload) {
      state.messages = payload;
    },
    SET_EDITORS(state, payload) {
      state.editors = payload;
    },
    ADD_MESSAGE(state, payload) {
      state.messages.push(payload);
    },
    ADD_USER(state, payload) {
      state.users.push(payload);
    },
  },
  actions: {
    load({commit}, params) {
      ApiService.getProject(params.id)
          .then(res => {
            return res.data
          })
          .then(json => {
            commit("SET_MESSAGES", json.messages);
            commit("SET_EDITORS", json.editors);
          });
    },
  },
  getters: {
    projectName: state => {
      return state.messages;
    },
    messages: state => {
      return state.messages;
    },
    users: state => {
      return state.editors;
    }
  }
}