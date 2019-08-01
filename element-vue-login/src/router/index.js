import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Edit from '@/components/Edit'
import Axios from '@/components/Axios'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/Axios',
      name: 'Axios',
      component: Axios
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/Login'
    }
  ]
})
