import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

import router from './router.js'

Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
