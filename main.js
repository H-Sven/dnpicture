import Vue from 'vue'
import App from './App'
import { get, post } from '@/api/index.js'

Vue.config.productionTip = false
Vue.prototype.$get = get
Vue.prototype.$post = post

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
