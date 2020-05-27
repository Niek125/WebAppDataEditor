import ApiService from "../services/ApiService";

export default {
    namespaced: true,
    state: {
        projects: [],
    },
    mutations: {
        SET_PROJECTS(state, payload) {
            state.projects = payload;
        }
    },
    actions: {
        load({commit}, params) {
            ApiService.getProjects(params.token)
                .then(res => {
                    return res.data;
                })
                .then(json => {
                    commit("SET_PROJECTS", json);
                })
        }
    },
    getters: {
        projects: state => {
            return state.projects;
        }
    }
}