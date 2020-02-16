export default {
    namespaced: true,
    state: {
        tab: "closed",
        height: "(100vh - 64px)",
        sideBarWidth: "64px",
        sideTabWidth: "(3.5 * (100vw /12))",
        headerHeight: "60px",
    },
    mutations: {
        SET_TAB(state, payload){
            state.tab = payload;
        },
    },
    actions: {
        setTab({commit}, nTab){
            commit("SET_TAB", nTab);
        },
    },
    getters: {
        tab: state => {
            return state.tab;
        },
        sideBarWidth: state => {
            return state.sideBarWidth;
        },
        sideBarWidthExpanded: state => {
            return "(" + state.sideBarWidth + " + " + state.sideTabWidth + ")"
        },
        sideTabWidth: state =>{
            return state.sideTabWidth;
        },
        height: state => {
            return state.height;
        },
        headerHeight: state => {
            return state.headerHeight;
        }
    }
}