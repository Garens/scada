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
      <el-row v-bind:style="styleObject">
        <el-col :span="4"><div class="grid-content bg-purple">
          <!-- 左边菜单 -->
          <left-menu></left-menu>
        </div></el-col>
        <!-- 中间主要部分 -->
        <el-col :span="16" class="content"><div class="grid-content bg-purple-light">
          <!-- 面包屑 -->
          <bread-crumb></bread-crumb>
          <!-- 内容页 -->
          <el-col :span="24" class="wraps">
            <el-button type="success" @click="showDiag">打开</el-button>
          </el-col>
        </div></el-col>

        <el-col :span="4"><div class="grid-content bg-purple" id="rightList">
          <right-list></right-list>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div theme="dark" class="grid-content bg-purple-dark">
          底部
        </div></el-col>
      </el-row>
      <div class="dialog">
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>

import NavMenu from './components/NavMenu.vue'
import BreadCrumb from './components/Breadcrumb.vue'
import Tabs from './components/Tabs.vue'
import LeftMenu from './components/LeftMenu.vue'
import RightList from './components/RightList.vue'
// import ElDialog from './components/Dialog.vue'


// import '../theme/index.css'
export default {
  // name: 'app',
  components: {
    NavMenu,Tabs,LeftMenu,RightList,BreadCrumb
  },
  data () {
    return {
      dialogVisible:false,
      styleObject: {
        height: (window.innerHeight-100) +'px',
        "overflow-y": 'auto'
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.onResizeWindow();
    });
  },
  methods:{
    onResizeWindow() {
      var _this = this;
      window.onresize = function() {
        _this.styleObject.height = (window.innerHeight-100) +'px';
      }
    },
    showDiag(){
      console.log(223);
      this.dialogVisible = true
      console.log(this.dialogVisible);
      // this.dVisible = true;
    }
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
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
.content {
  padding: 20px;
}
.bg-purple-dark {
  color: #fff;
  background-color: #1F2D3D;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
