import Vue from 'vue'
import Router from 'vue-router'
import Tabs from '@/components/Tabs'
// import NavMenu from '@/components/NavMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Tabs',
      component:Tabs
    }
  ]
})
