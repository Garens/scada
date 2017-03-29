<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->

      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <!-- 顶部菜单 start-->
          <nav-menu></nav-menu>
          <!-- 顶部菜单 end    -->
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
          <!-- 左边菜单 -->
          <left-menu></left-menu>
        </div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">
          <tabs></tabs>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" id="rightList">
          <right-list></right-list>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          底部
        </div></el-col>
      </el-row>
    </div>
</template>

<script>

import NavMenu from './components/NavMenu.vue'
import Tabs from './components/Tabs.vue'
import LeftMenu from './components/LeftMenu.vue'
import RightList from './components/RightList.vue'


// import '../theme/index.css'
export default {
  // name: 'app',
  components: {
    NavMenu,Tabs,LeftMenu,RightList
  }
}


</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.bg-purple-dark {
  color: #fff;
  background-color: rgb(31, 61, 47);
  height: 40px;
  line-height: 40px;
}
</style>
