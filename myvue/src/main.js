import 'normalize.css'
import '@/assets/css/public.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import 'nprogress/nprogress.css'

import * as API from "@/http/api"

Vue.prototype.$API = API

// console.log(API);

Vue.config.productionTip = false

import MBX from '@/components/MBX'
Vue.component("MBX", MBX)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')