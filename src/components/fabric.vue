<template>
  <div>
    <div class="pixi" id="fabric">

    </div>
  </div>
</template>

<script>
import ElBtn from './Button.vue'
import axios from 'axios'
// import fabric from '../assets/fabric.1.7.11.js'

  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 2,
        docIdList:[],
        docList:[]
      }
    },
    components: {
      ElBtn
    },
    events:{
    },
    created () {

    },
    mounted: function () {
      this.$nextTick(function () {
        this.initScada();
        this.getObjects();
        this.initFabric();
      });
    },
    methods: {
      initScada: function() {
        // var scada =
        this.scada = new Scada();
      },
      initFabric:function(){
        var canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.width = 1200;
        canvas.height = 900;
        document.getElementById('fabric').appendChild(canvas);
        this.canvas = new fabric.Canvas('canvas',{backgroundColor:'#1099bb'});
      },
      getObjects: function() {
        var _this = this;
        axios.get('/server/getDeviceList').then(function(res){
          console.log(res);
          var objs = res.data;
          console.log(objs);
          _this.scada.init(objs);
          _this.objects = [];
          var type = ['path','group','path-group','rect','path1'];
          for(var i in objs) {
            if(!type.includes(objs[i].type)) {
              continue;
            }
            _this.objects.push(objs[i].data);
          }
          _this.test1();
        })
      },
      test1: function() {
        var _this = this;
        this.startTimer();
        var json = {objects:this.objects,backgroundColor:'#1099bb'}
        this.canvas.loadFromJSON(json, function(){
          _this.canvas.renderAll();
          _this.stopTimer();
        });
      },
      startTimer () {
        this.t1 = new Date().getTime();
        return this.t1;
      },
      stopTimer () {
        this.t2 = new Date().getTime();
        this.t = this.t2 - this.t1;
        return this.t;
      }
    }
  }
</script>

<style>
  .el-tab-pane {
    background-color: #1099bb;
  }
</style>
