<template>
  <div class="block">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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
