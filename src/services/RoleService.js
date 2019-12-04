import axios from 'axios'
import EurekaServer from "./EurekaServer";

var roleService = null;
EurekaServer.getInstance("role-management-service").then((url) => {
    roleService = axios.create({
        baseURL: url.data,
        withCredentials: false
    });
});

export default {
    getUsers(projectid, token) {
        var x = this;
        if (roleService == null) {
            return setTimeout(function () {
                x.getUsers(projectid);
            }, 10);
        }
        return roleService.get("user/getusers/" + projectid, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });
    }
}