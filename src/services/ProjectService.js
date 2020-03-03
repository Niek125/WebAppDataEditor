// import axios from "axios"
// import EurekaServer from "./EurekaServer";

// let projectService = null;
// let projectProducer = null;

// async function loadService() {
    // await EurekaServer.getInstance("project-service").then((url) => {
    //     projectService = axios.create({
    //         baseURL: "https://" + url.data,
    //         withCredentials: false,
    //     });
    // });
// }

// async function loadProducer() {
    // await EurekaServer.getInstance("project-producer").then((url) => {
    //     projectProducer = axios.create({
    //         baseURL: "https://" + url.data,
    //         withCredentials: false,
    //     });
    // });
// }

export default {
    async getProjects() {
        // if (projectService == null) {
        //     await loadService();
        // }
        // return projectService.get("project/read/projects", {
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + token
        //     }
        // });
    },
    async getProject() {
        // if (projectService == null) {
        //     await loadService();
        // }
        // return projectService.get("project/read/project/" + projectid, {
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + token
        //     }
        // });
    },
    async addProject() {
        // if(projectProducer == null){
        //     await loadProducer();
        // }
        // const fdata = new FormData();
        // fdata.append("file", file);
        // fdata.append("project", JSON.stringify(project))
        // await projectProducer.post("/project/create", fdata, {
        //     headers: {
        //         contentType: false,
        //         Authorization: "Bearer " + token
        //     }
        // });
    }
}