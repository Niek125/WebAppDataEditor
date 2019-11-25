import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

var firebase = require("firebase/app");
Vue.use(firebase);

// Add the Firebase products that you want to use
var auth = require("firebase/auth");
Vue.use(auth);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
