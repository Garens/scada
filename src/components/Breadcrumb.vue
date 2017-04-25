<template>
  <div class="block">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/addUser' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/userList' }">添加用户</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default{
    methods:{
      showDiag(){
        // console.log(this.$emit('btn-click',true));
        this.$emit('btn-click',true);
        // this.$dispatch('disSave')
      }
    }
  }
</script>

<style>
  .el-breadcrumb {
    height: 30px;
    line-height: 30px;
  }
</style>
