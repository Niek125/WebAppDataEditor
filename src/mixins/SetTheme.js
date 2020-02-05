import store from "../store/store";
import Vue from "vue"

export const setTheme = {
    methods:{
        setTheme: function (id){
            switch (id) {
                case 0:
                    store.dispatch("theme/setDarkTheme");
                    break;
                case 1:
                    store.dispatch("theme/setWhiteTheme");
                    break;
            }
            if(Vue.prototype.$cookie.get("theme") != null){
                Vue.prototype.$cookie.set("theme", id);
            }
        }
    }
}