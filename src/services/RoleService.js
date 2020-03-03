// import axios from "axios"
// import EurekaServer from "./EurekaServer";
//
// let roleService = null;
//
// async function load() {
//     await EurekaServer.getInstance("role-management-service").then((url) => {
//         roleService = axios.create({
//             baseURL: "https://" + url.data,
//             withCredentials: false
//         });
//     });
// }

export default {
    async getusers() {
        // if (roleService == null) {
        //     await load();
        // }
        // return roleService.get("user/getusers/" + projectid, {
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + token
        //     }
        // });
    },
    async getuserslike() {
        // if (roleService == null) {
        //     await load();
        // }
        // return roleService.get("user/users/" + start, {
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + token
        //     }
        // });
    },
    async saverole() {
        // if (roleService == null) {
        //     await load();
        // }
        // const r = {
        //     roleid: roleid,
        //     projectid: projectid,
        //     userid: userid,
        //     role: role
        // }
        // roleService.post("role/save", JSON.stringify(r), {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
    },
    async updaterole() {
        // if (roleService == null) {
        //     await load();
        // }
        // roleService.post("role/save", JSON.stringify(role), {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
    }
};