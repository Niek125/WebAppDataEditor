import axios from 'axios'
import EurekaServer from "./EurekaServer";

var projectService = null;

async function load() {
    await EurekaServer.getInstance("project-service").then((url) => {
        projectService = axios.create({
            baseURL: "http://" + url.data,
            withCredentials: false,
        });
    });
}

export default {
    async getProjects(token) {
        if (projectService == null) {
            await load();
        }
        return projectService.get('project/read/projects', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });
    },
    async getProject(projectid, token) {
        if (projectService == null) {
            await load();
        }
        return projectService.get('project/read/project/' + projectid, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });
    }
}