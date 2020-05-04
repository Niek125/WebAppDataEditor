import Vue from "vue"
import router from "../router";

export const redirectProject = {
    methods: {
        redirectProject: function (id) {
            router.push({name: "dataView", params: {projectId: id}});
            let cookie = JSON.parse(Vue.prototype.$cookie.get("recent"));
            if (cookie != null) {
                for (let i = 0; i < cookie.length; i++) {
                    if ((new String(cookie[i]).valueOf() == new String(id).valueOf()) || (i > 3)) {
                        cookie.splice(i, 1);
                        i--;
                    }
                }
                cookie.unshift(id);
                Vue.prototype.$cookie.set("recent", JSON.stringify(cookie), {expires: "1M"});
            }
        }
    }
}