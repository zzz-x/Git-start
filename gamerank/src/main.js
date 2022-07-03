// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import bm_search_input from 'bm_search_input'
import MyLeftMenu from './components/my-left-menu.vue'
import MyGameCard from './components/my-game-card.vue'
import MyGameRecommend from './components/my-game-recommend.vue'
import MyCommentCard from './components/my-comment-card.vue'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component('bm_search_input',bm_search_input);
Vue.component('my-left-menu',MyLeftMenu)
Vue.component('my-game-card',MyGameCard)
Vue.component('my-game-recommend',MyGameRecommend)
Vue.component('my-comment-card',MyCommentCard)

Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
