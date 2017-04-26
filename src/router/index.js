import Vue from 'vue'
import Router from 'vue-router'
import addUser from '@/components/addUser'
import userList from '@/components/userList'
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
    }
  ]
})
