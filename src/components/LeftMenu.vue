<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu :router=router v-bind:default-openeds="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu v-for="(item,index) in column" :index="item.name">
          <template slot="title"><i class="el-icon-message"></i>{{item.title}}</template>
          <el-menu-item-group v-if="item.child" v-for="(item1,index1) in item.child">
            <template slot="title">{{item1.title}}</template>
            <el-menu-item v-if="item1.child" v-for="(item2,index2) in item1.child" :index="'/' + item.name + '/' + item1.name + '/' +item2.name">{{item2.title}}</el-menu-item>
            <!-- <el-menu-item index="/manage/user/userList">用户列表</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import Constant from '../../config/routers.js'
const column = Constant.column;
export default {
  data () {
    return {
      router: true,
      activeIndex:['1','1-4'],
      column: []
    }
  },
  created () {
    this.getMenuList();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getMenuList'
  },
  methods: {
    getMenuList() {
      this.column = column;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
