import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
import { domain, clientId, audience } from "../auth_config.json";
import Flag from 'vue-flagpack'
// Import the plugin here
import { Auth0Plugin } from "./auth";

Vue.use(Auth0Plugin,  {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
Vue.use(Flag, {
  name: 'Flag'
}) 
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
