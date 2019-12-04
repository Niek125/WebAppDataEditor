import axios from 'axios'
import EurekaServer from "./EurekaServer";

var projectService = null;
EurekaServer.getInstance("project-service").then((url) => {
    projectService = axios.create({
        baseURL: url.data,
        withCredentials: false
    });
});

export default {
    getProjects(token) {
        if (projectService == null) {
            return setTimeout(function () {
                this.getProjects(token);
            }, 10);
        }
        return projectService.get('project/read/projects', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });
    },
    getProject(projectid, token) {
        if (projectService == null) {
            return setTimeout(function () {
                this.getProject(projectid, token);
            }, 10);
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