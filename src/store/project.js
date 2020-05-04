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
        SET_USERS(state, payload){
            state.users = payload;
        },
        ADD_MESSAGE(state, payload){
            state.messages.push(payload);
        },
        ADD_USER(state, payload){
            state.users.push(payload);
        }
    },
    actions: {
        load({commit}, params){
            fetch("/api/projects/" + params.id)
                .then(res => res.json())
                .then(json => {
                    window.console.log(json);
                    commit("SET_MESSAGES", json.messages);
                    commit("SET_USERS", json.users);
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