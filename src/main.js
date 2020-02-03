import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from "./store/store";

Vue.config.productionTip = false

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

const firebase = require("firebase/app");
Vue.use(firebase);

import VueSession from 'vue-session'

Vue.use(VueSession, {
    persist: true
})

// Add the Firebase products that you want to use
const auth = require("firebase/auth");
Vue.use(auth);

// router.beforeEach((to, from, next) => {
//     if (!Vue.prototype.$session.exists() && to.name !== 'login') {
//         next({name: 'login'});
//     } else {
//         next();
//     }
// })

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')
