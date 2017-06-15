import Vue from 'vue'
import Router from 'vue-router'
import addUser from '@/components/addUser'
import userList from '@/components/userList'
import scada from '@/components/scada'
import fabric from '@/components/fabric'
import pixi from '@/components/pixi'
import pixiAni from '@/components/pixiAni'
import demo1 from '@/components/demo1'
import canvas from '@/components/canvas'
// import NavMenu from '@/components/NavMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/manage/user/addUser',
      name:'addUser',
      component:addUser
    },
    {
      path:'/manage/user/userList',
      name:'userList',
      component:userList
    },
    {
      path: '/manage/user/',
      component:userList
    },
    {
      path: '/pixi',
      component:pixi
    },
    {
      path: '/scada',
      component:scada
    },
    {
      path: '/fabric',
      component:fabric
    },
    {
      path: '/pixiAni',
      component:pixiAni
    },
    {
      path: '/demo1',
      component:demo1
    },
    {
      path: '/canvas',
      component:canvas
    }
  ]
})
