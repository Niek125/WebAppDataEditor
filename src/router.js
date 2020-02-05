import Vue from "vue"
import Router from "vue-router"
import Overview from "./views/Overview"
import DataView from "./views/DataView"
import LogIn from "./views/LogIn";
import AppWrapper from "./views/AppWrapper";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "*",
            redirect: "/overview"
        },
        {
            path: "/dataeditor",
            name: "appwrapper",
            component: AppWrapper,
            children: [
                {
                    path: "/overview",
                    name: "overview",
                    component: Overview
                },
                {
                    path: "/dataview/:projectid",
                    name: "dataview",
                    component: DataView
                }

            ]
        },
        {
            path: "/login",
            name: "login",
            component: LogIn
        },
    ]
})