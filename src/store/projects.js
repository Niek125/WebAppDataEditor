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
        load({commit}) {
            fetch("/api/projects")
                .then(res => res.json())
                .then(json => {
                    commit("SET_PROJECTS", json.projects);
                })
        }
    },
    getters: {
        projects: state => {
            return state.projects;
        }
    }
}