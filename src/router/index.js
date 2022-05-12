import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import Home from '../views/Home/Home.vue'
import Details from '../views/NewView/Details/Details.vue'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BaseLayout',
      component:()=>import('../layout/BaseLayout.vue'),
      redirect:'/home',
      children:[
        {
          path:'/home',
          name:'home',
          meta: {
            // requiresAuth: true,
            keepAlive:true
          },
          component : Home
        },
        {
          path:'/class',
          name:'class',
          meta: {
            // requiresAuth: true,
            keepAlive:true
          },
          component:()=>import('../views/Class/Class.vue')
          // component:Class
        },
        {
          path:'/laboratory',
          name:'laboratory',
          meta: { 
            // requiresAuth: true
            keepAlive:true
           },
          component:()=>import('../views/Laboratory/Laboratory.vue')

        },
        {
          path:'/message',
          name:'message',
          meta: {
            // requiresAuth: true,
            keepAlive:true
          },
          component:()=>import('../views/Message/Message.vue')
        },
        {
          path:'/about',
          name:'about',
          meta: {
            // requiresAuth: true,
            keepAlive:true
          },
          component:()=>import('../views/About/About.vue')
        },
        {
          path:'/details',
          name:'details',
          meta: { 
            // requiresAuth: true
           },
          // component:()=>import('../views/NewView/Details/Details.vue')
          component:Details
        },
        {
          path:'/searched',
          name:'searched',
          meta: {
            // requiresAuth: true,
            // keepAlive:true
          },
          component:()=>import('../views/NewView/Searched/Searched.vue')
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/NewView/Login/Login.vue')
    },
    {
      path:'/regist',
      name:'regist',
      component:()=>import('../views/NewView/Regist/Regist.vue')
    },
    {
      path:'/userzone',
      name:'userzone',
      meta: {
        requiresAuth: true,
      },
      component:()=>import('../views/NewView/UserZone/layout/BaseLayout.vue'),
      redirect:'/userzone/userindex',
      children:[
        {
          path:'/userzone/userindex',
          name:'userindex',
          meta: {
            requiresAuth: true,
            keepAlive:true
          },
          component:()=>import('../views/NewView/UserZone/views/UserIndex/UserIndex.vue')
        },
        {
          path:'/userzone/usecollection',
          name:'usecollection',
          meta: {
            requiresAuth: true,
            keepAlive:true
          },
          component:()=>import('../views/NewView/UserZone/views/UserCollection/UserCollection.vue')
        },
        {
          path:'/userzone/usernotification',
          name:'usernotification',
          meta: {
            requiresAuth: true,
            keepAlive:true
          },
          component:()=>import('../views/NewView/UserZone/views/UserNotification/UserNotification.vue')
        },
        {
          path:'/userzone/userinformation',
          name:'userinformation',
          meta: {
            requiresAuth: true,
            keepAlive:true
          },
          component:()=>import('../views/NewView/UserZone/views/UserInformation/UserInformation.vue')
        }
      ]
    }
    
  ],
  
})
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if(!store.getters.userinfo.islogin){
      router.push('/login')
    }
  }
  next()
})

export default router