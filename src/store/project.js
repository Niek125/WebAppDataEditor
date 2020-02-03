export default {
    namespaced: true,
    state: {
        project: {
            projectId: "",
            projectName: ""
        },
        chatMessages: [],
        users: []
    },
    mutations: {
    //     SET_PROJECT_NAME(state, payload){
    //
    //     },
    //     ADD_CHAT_MESSAGE(state, payload){
    //
    //     },
    },
    actions: {
    //     loadStore({commit}, {token}){
    //
    //     },
    },
    getters: {
        project: state => {
            return state.project;
        },
        // chatMessages: state => {
        //     state.chatMessages();
        // },
        // users: state => {
        //     return state.users;
        // }
    }
}