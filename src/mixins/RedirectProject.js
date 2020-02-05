import Vue from "vue"

export const redirectProject = {
    methods: {
        redirectProject: function (id) {
            Vue.prototype.$router.push({name: "dataView", params: {projectId: id}});
            let cookie = JSON.parse(Vue.prototype.$cookie.get("recent"));
            if (cookie != null) {
                for (let i = 0; i < cookie.length; i++) {
                    if ((new String(cookie[i]).valueOf() == new String(id).valueOf()) || (i > 3)) {
                        cookie.splice(i, 1);
                        i--;
                    }
                }
                cookie.unshift(JSON.parse(Vue.prototype.$session.get("userData").pms).find(x => x.projectid == id).projectid);
                Vue.prototype.$cookie.set("recent", JSON.stringify(cookie), {expires: "1M"});
            }
        }
    }
}