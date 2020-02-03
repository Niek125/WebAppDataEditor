export default {
    namespaced: true,
    state: {
        dark: true,
        divider: 'white',
        textColor: "white--text ",
        level0: "black",
        level1: "grey darken-4",
        level2: "grey darken-3",
        level3: "grey darken-2",
        level4: "grey darken-1",
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        dark: state => {
            return state.dark;
        },
        divider: state => {
            return state.divider;
        },
        textColor: state => {
            return state.textColor;
        },
        level0: state => {
            return state.level0;
        },
        level1: state => {
            return state.level1;
        },
        level2: state => {
            return state.level2;
        },
        level3: state => {
            return state.level3;
        },
        level4: state => {
            return state.level4;
        },
    }
}