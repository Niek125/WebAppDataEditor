import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8102/api",
    withCredentials: false,
})

export default {
    getToken(firebaseToken){
        return api.get("/token/new", {
            headers: {
                firebaseToken: firebaseToken
            }
        })
    },
    getProjects(token){
        return api.get("/project", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}