import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// 导入 Bootstrap 和 BootstrapVue CSS 文件（顺序很重要）
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
// 使 BootstrapVue 在整个项目中可用
Vue.use(BootstrapVue); // 可选择安装 BootstrapVue 图标组件插件
Vue.use(IconsPlugin);

// Vuelidate
Vue.use(Vuelidate);

// axios
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
