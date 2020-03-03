export default {
    namespaced: true,
    state: {
            projectId: "",
            projectName: "",
            messages: [],
            users: [],
    },
    mutations: {
        SET_PROJECT_NAME(state, payload){
            state.projectName = payload;
        },
        SET_MESSAGES(state, payload){
          state.messages = payload;
        },
        ADD_MESSAGE(state, payload){
            state.messages.push(payload);
        },
        ADD_USER(state, payload){
            state.users.push(payload);
        }
    },
    actions: {
        load({commit}, payload){
            fetch("/api/projects/" + payload.id)
                .then(res => res.json())
                .then(json => {
                    commit("SET_MESSAGES", json.project.messages);
                });
        },
    },
    getters: {
        messages: state => {
            return state.messages;
        },
        users: state => {
            return state.users;
        }
    }
}