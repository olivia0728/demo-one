import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import {createPinia,PiniaVuePlugin} from 'pinia'
Vue.use(PiniaVuePlugin)
const pinia = createPinia()//需要挂载在实例上

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  router,
  pinia,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
