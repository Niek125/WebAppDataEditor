import Vue from "vue"
import Vuex from "vuex"
import project from "./project";
import theme from "./theme";
import dataView from "./dataView";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { project, theme, dataView }
})