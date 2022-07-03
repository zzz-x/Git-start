import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:() => import('@/views/MainPage')
    },
    {
      path:'/mainpage/:type?/:year?',
      name:'MainPage',
      component:() => import('@/views/MainPage'),
    },
    {
      path:'/gamepage/:id',
      name:'gamePage',
      component:()=>import('@/views/gamepage')
    },
    {
      path:'/userpage/:userid',
      name:'userPage',
      component:()=>import('@/views/userpage')
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@/views/login')
    },
    {
      path:'/register',
      name:'register',
      component:()=>import('@/views/register')
    },
    {
      path:'/upload',
      name:'uploadPage',
      component:()=>import('@/views/upload')
    },
    {
      path:'/ranklist',
      name:'ranklist',
      component:()=>import('@/views/ranklist')
    }
  ]
})
