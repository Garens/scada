<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu :router=router v-bind:default-openeds="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>基本信息管理</template>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="/user/addUser">添加用户</el-menu-item>
            <el-menu-item index="/user/userList">用户列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      router: true,
      activeIndex:['1','1-4']
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
