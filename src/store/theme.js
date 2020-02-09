export default {
    namespaced: true,
    state: {
        overlayOpacity: 0.8,
        btnAccept: "green darken-4",
        btnDeny: "red darken-4",
        btnInfo: "blue darken-4",
        gradient: "black-gradient",
        scrollStyle: "grey-white-grey",
        dark: true,
        divider: "white",
        textColor: "white--text ",
        level0: "black",
        level1: "grey darken-4",
        level2: "grey darken-3",
        level3: "grey darken-2",
        level4: "grey darken-1",
        level5: "grey",
    },
    mutations: {
        SET_OVERLAY_OPACITY(state, payload) {
            state.overlayOpacity = payload;
        },
        SET_BTN_ACCEPT(state, payload) {
            state.btnAccept = payload;
        },
        SET_BTN_DENY(state, payload) {
            state.btnDeny = payload;
        },
        SET_BTN_INFO(state, payload) {
            state.btnInfo = payload;
        },
        SET_GRADIENT(state, payload) {
            state.gradient = payload;
        },
        SET_SCROLL_STYLE(state, payload) {
            state.scrollStyle = payload;
        },
        SET_DARK(state, payload) {
            state.dark = payload
        },
        SET_DIVIDER(state, payload) {
            state.divider = payload
        },
        SET_TEXT_COLOR(state, payload) {
            state.textColor = payload + " ";
        },
        SET_LEVEL0(state, payload) {
            state.level0 = payload;
        },
        SET_LEVEL1(state, payload) {
            state.level1 = payload;
        },
        SET_LEVEL2(state, payload) {
            state.level2 = payload;
        },
        SET_LEVEL3(state, payload) {
            state.level3 = payload;
        },
        SET_LEVEL4(state, payload) {
            state.level4 = payload;
        },
        SET_LEVEL5(state, payload) {
            state.level5 = payload;
        },
    },
    actions: {
        setDarkTheme({commit}) {
            commit("SET_OVERLAY_OPACITY", 0.8);
            commit("SET_BTN_ACCEPT", "green darken-4");
            commit("SET_BTN_DENY", "red darken-4");
            commit("SET_BTN_INFO", "blue darken-4");
            commit("SET_GRADIENT", "black-gradient");
            commit("SET_SCROLL_STYLE", "grey-white-grey");
            commit("SET_DARK", true);
            commit("SET_DIVIDER", "white");
            commit("SET_TEXT_COLOR", "white--text");
            commit("SET_LEVEL0", "black");
            commit("SET_LEVEL1", "grey darken-4");
            commit("SET_LEVEL2", "grey darken-3");
            commit("SET_LEVEL3", "grey darken-2");
            commit("SET_LEVEL4", "grey darken-1");
            commit("SET_LEVEL5", "grey");
        },
        setWhiteTheme({commit}) {
            commit("SET_OVERLAY_OPACITY", 0.0);
            commit("SET_BTN_ACCEPT", "green lighten-2");
            commit("SET_BTN_DENY", "red lighten-2");
            commit("SET_BTN_INFO", "blue lighten-2");
            commit("SET_GRADIENT", "white-gradient");
            commit("SET_SCROLL_STYLE", "grey-black-grey");
            commit("SET_DARK", false);
            commit("SET_DIVIDER", "black");
            commit("SET_TEXT_COLOR", "black--text");
            commit("SET_LEVEL0", "white");
            commit("SET_LEVEL1", "grey lighten-4");
            commit("SET_LEVEL2", "grey lighten-3");
            commit("SET_LEVEL3", "grey lighten-2");
            commit("SET_LEVEL4", "grey lighten-1");
            commit("SET_LEVEL5", "grey");
        }
    },
    getters: {
        overlayOpacity: state => {
            return state.overlayOpacity;
        },
        btnAccept: state => {
            return state.btnAccept;
        },
        btnDeny: state => {
            return state.btnDeny;
        },
        btnInfo: state => {
            return state.btnInfo;
        },
        gradient: state => {
            return state.gradient;
        },
        scrollStyle: state => {
            return state.scrollStyle;
        },
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
        level5: state => {
            return state.level5;
        },
    }
}