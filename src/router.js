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
            path: "/dataEditor",
            name: "appWrapper",
            component: AppWrapper,
            children: [
                {
                    path: "/overview",
                    name: "overview",
                    component: Overview
                },
                {
                    path: "/dataView/:projectId",
                    name: "dataView",
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