<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

import './assets/js/jquery-3.6.0.js'
import './assets/css/animate.min.css'

import MyLeftMenu from "@/components/my-left-menu.vue";
import MyGameCard from "@/components/my-game-card.vue";
import MyGameRecommend from '@/components/my-game-recommend.vue'
import MyCommentCard from '@/components/my-comment-card.vue'
import bm_search_input from 'bm_search_input'

export default {
  components:{
    MyLeftMenu,
    MyGameCard,
    bm_search_input,
    MyGameRecommend,
    MyCommentCard
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #f5f7f8;
  height: 100%;
  width:100%;
  height:100%;
  padding-top:30px;
}
</style>
