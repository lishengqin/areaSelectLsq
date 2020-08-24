import Vue from 'vue';
import App from './App.vue';
// 引入开发的组件库，
import areaSelectLsq from '../src';

// 使用 Vue.use 安装开发的组件库
Vue.use(areaSelectLsq);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
