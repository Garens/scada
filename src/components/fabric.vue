<template>
  <div>
    <div class="pixi">
      <span>{{message}}</span>
      <el-button type="warning" @click="switchData">切换</el-button>
      <el-button type="warning" @click="changeData">改变</el-button>
      <canvas-fabric :canvasData="canvasObj"></canvas-fabric>
    </div>
  </div>
</template>

<script>
import ElBtn from './Button.vue'
import CanvasFabric from './CanvasFabric.vue'
import axios from 'axios'

  export default {
    data() {
      return {
        canvasObj: {},
        canvasList: null,
        message: '这个是原始的'
      }
    },
    components: {
      ElBtn,CanvasFabric
    },
    events:{
    },
    created () {
      var _this = this;
      var i = 0;
      console.log(this);
      this.$socket.on('connect', function(data) {
        console.log('socket is connected');
        _this.$socket.emit('sendMsg', {name: 'test'});
      })
      this.$socket.on('msg', function(data) {
        console.log(111,data[0]);
        _this.message = data[0].msg;
        // setTimeout(function() {
        //   // _this.$socket.emit('msg', '你是SB！第'+i + '次');
        //   i++;
        // },3000);
      })
      // this.list = this.canvasList;
    },
    mounted: function () {
      this.$nextTick(function () {
        this.initScada();
        this.getObjects();
        // this.initFabric();
      });
    },
    methods: {
      initScada: function() {
        // var scada =
        this.scada = new Scada();
      },
      switchData: function() {

        var i = Math.random()*this.canvasList.length;
        i = parseInt(i);
        console.log(i);
        console.log(this.canvasList);
        // this.canvasObj = {};
        // this.canvasObj = Object.assign({},this.canvasList[i]);
        this.canvasObj = JSON.parse(JSON.stringify(this.canvasList[i]));
      },
      changeData: function() {
        for(var i in this.canvasObj.canvas.objects) {
          this.canvasObj.canvas.objects[i].left +=10;
        }
        console.log(this.canvasObj);
        this.canvasObj = Object.assign({},this.canvasObj);
      },
      getObjects: function() {
        var _this = this;
        // axios.get('/server/getDeviceList').then(function(res){
        //   console.log(res);
        //   var objs = res.data;
        //   // console.log(objs);
        //   _this.scada.init(objs);
        //   _this.canvasObj = [];
        //   var type = ['group'];
        //   for(var i in objs) {
        //     if(!type.includes(objs[i].type)) {
        //       continue;
        //     }
        //     objs[i].data._objects = objs[i].data.objects;
        //     console.log(objs[i].data);
        //     _this.canvasObj.push(objs[i].data);
        //   }
        // })
        axios.get('/server/getDocData', {params: {
          id: 'c62a61959d41063e82efe8744294a892'
        }}).then(function(res) {
          console.log(res);
          if(res.data.flag) {
            // _this.canvasObj = res.data.data[1];
            _this.canvasList = res.data.data;
          }
        })
      },
    }
  }
</script>

<style>
  .el-tab-pane {
    background-color: #1099bb;
  }
</style>
