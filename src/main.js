// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './tools/http/request'
import GLOBAL from './tools/global'
import store from './store/store.js';
// Eharts
let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require("echarts/lib/component/polar");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')
require('echarts/lib/component/markLine')
require('echarts/lib/component/legendScroll')

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$request = request;
Vue.prototype.GLOBAL = GLOBAL
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    var token = localStorage.getItem('token') || '';
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    eventHub: new Vue()
  },
  store,
  components: { App },
  template: '<App/>'
})
