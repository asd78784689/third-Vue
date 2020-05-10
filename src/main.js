// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/rem';
import VueLazyload from 'vue-lazyload'
import './assets/scss/index.scss' 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css' //引入swiper的css 

Vue.use(VueLazyload,{
    preLoad:1,   // 是个小数 还剩多少时候进行加载 1为完全显示时候加载 1.1等以上时会进行预加载之后的
    error:require('@/assets/img/error.png'),   //失败时候的加载的图片
    loading:require('@/assets/img/loading.gif'),   //加载中时候的图片
    attempt:1,   //尝试加载次数
});
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
