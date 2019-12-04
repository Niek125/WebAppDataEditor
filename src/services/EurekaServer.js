import axios from 'axios'

const eurekaServer = axios.create({
    baseURL: 'http://localhost:8101/server-instances/',
    withCredentials: false
});

export default {
    getInstance(instanceName) {
        return eurekaServer.get("getinstance/" + instanceName);
    }
}