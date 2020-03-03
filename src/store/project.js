export default {
    namespaced: true,
    state: {
        project: {
            projectId: "",
            projectName: "",
            chatMessages: [],
            users: [],
        }
    },
    mutations: {
        SET_PROJECT(state, payload){
            state.project = payload;
        },
        SET_PROJECT_NAME(state, payload){
            state.project.projectName = payload;
        },
        ADD_CHAT_MESSAGE(state, payload){
            state.project.chatMessages.push(payload);
        },
        ADD_USER(state, payload){
            state.project.users.push(payload);
        }
    },
    actions: {
        loadStore({commit}, {id}){
            fetch("api/project/" + id)
                .then(res => res.json())
                .then(json => {
                    commit("SET_PROJECT", json);
                });
        },
    },
    getters: {
        project: state => {
            return state.project;
        },
        chatMessages: state => {
            state.project.chatMessages;
        },
        users: state => {
            return state.project.users;
        }
    }
}