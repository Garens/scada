<template>
  <div class="block">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/user/addUser' }">用户管理</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item,index) in paths" :to="item.path">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import Constant from '../../config/routers.js'
  const column = Constant.column;
  export default{
    props: ['hiddenPath'],
    data () {
      return {
        currentRoute: {path: this.$route.path+'s'},
        // title: this.$router.meta.title,
        pathName: [],
        paths: []
      }
    },
    created () {
      this.findPath();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'findPath'
    },
    methods:{
      findPath () {
        let title = this.title;
        let path = this.$route.path.split("/");
        path.shift();

        let paths = [];
        let i = 0;
        let findPath = function (arrayObj) {
            let obj = arrayObj.find(function (item) {
                return item.name == path[i];
            });
            if (typeof obj != "undefined") {
                let _path = (i == 0) ? `/${path[0]}` : `/${path[i - 1]}/${path[i]}`;
                paths[i] = {"path": _path, "title": obj.title};
                i++;
                if (typeof obj.child != "undefined" && obj.child.length && i < path.length) {
                    findPath(obj.child);
                }
            } else {
                let _path = (i == 0) ? `/${path[0]}` : `/${path[i - 1]}/${path[i]}`;
                paths[i] = {"path": _path, "title": title};
                i++;
                if (i < path.length) {
                    findPath(arrayObj);
                }
            }

        };

        findPath(column);
        console.log(paths);
        this.paths = paths;
      },
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
