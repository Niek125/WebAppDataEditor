import Vue from "vue"
import Vuex from "vuex"
import data from "./data";
import project from "./project";
import projects from "./projects";
import theme from "./theme";
import dataView from "./dataView";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { project, theme, dataView, projects, data, }
})