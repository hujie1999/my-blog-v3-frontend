// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import moment from 'moment'
import hljs from 'highlight.js'
import 'highlight.js/styles/paraiso-dark.css'
import MavonEditor from 'mavon-editor' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MavonEditor)

Vue.prototype.$hljs = hljs
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
