import axios from 'axios'

const projectService = axios.create({
    baseURL: 'http://localhost:8090/project',
    withCredentials: false
});

export default {
    getProjects(token) {
        return projectService.get('/read/projects',  {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        })
    }
}