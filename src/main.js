
import Vue from 'vue'
import './components'
import './plugins'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from '@/router'
import store from '@/store'
Vue.use(ElementUI)

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
