import axios from 'axios'
import EurekaServer from "./EurekaServer";

var roleService = null;

async function load() {
    await EurekaServer.getInstance("role-management-service").then((url) => {
    roleService = axios.create({
        baseURL: url.data,
        withCredentials: false
    });
});}

export default {
    async getusers(projectid, token) {
        if (roleService == null) {
            await load();
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