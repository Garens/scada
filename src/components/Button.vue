<template>
  <div class="block">
    <span class="wrapper">
      <el-button type="success" @click="showDiag">成功按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="info">信息按钮</el-button>
    </span>
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
