import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import ImgView from '@/components/ImgView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/imgview',
      name: 'ImgView',
      component: ImgView
    }
  ]
})
