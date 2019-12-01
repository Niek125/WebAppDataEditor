import axios from 'axios'

const projectService = axios.create({
    baseURL: 'http://localhost:8090/project',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getProjects() {
        return projectService.get('read/projects')
    }
}