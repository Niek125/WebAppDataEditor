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
    getusers(projectid, token) {
        var x = this;
        if (roleService == null) {
            return setTimeout(function () {
                x.getusers(projectid);
            }, 10);
        }
        return roleService.get("user/getusers/" + projectid, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });
    },
    getuserslike(start) {
        return roleService.get("user/users/" + start);
    },
    saverole(roleid, projectid, userid, role) {
        const r = {
            roleid: roleid,
            projectid: projectid,
            userid: userid,
            role: role
        }
        roleService.post("role/save", JSON.stringify(r), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    updaterole(role) {
        roleService.post("role/save", JSON.stringify(role), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};