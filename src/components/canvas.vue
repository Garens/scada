<template>
  <div>
    <input type="text" v-model="reg" value="">
    <button type="button" @click="testClick">click</button>
    <div class="pixi" id="canvas-cont">

    </div>
  </div>
</template>

<script>
// import ElBtn from './Button.vue'
import axios from 'axios'
// import fabric from '../assets/fabric.1.7.11.js'

  export default {
    data() {
      return {
        ctx: null,
        reg: ''
      }
    },
    components: {
      // ElBtn
    },
    events:{
    },
    created () {

    },
    mounted: function () {
      this.$nextTick(function () {
        this.initCanvas();
        this.drawEle();
      });
    },
    methods: {
      testClick: function() {
        var reg1 = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])|0$/g;
        var r = this.reg.match(reg1);
        console.log(r);
        if(r && r[0] === this.reg) {
          return true;
        } else {
          return false;
        }
      },
      initCanvas:function(){
        var canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.width = 1200;
        canvas.height = 900;
        document.getElementById('canvas-cont').appendChild(canvas);
        this.ctx = canvas.getContext('2d');
      },
      drawEle: function() {
        var canvas = this.ctx;
        canvas.fillStyle = 'red';
        canvas.strokeStyle = 'blue';
        canvas.moveTo(100, 150);
        canvas.bezierCurveTo(75, 150, 50, 125, 50, 100);
        canvas.bezierCurveTo(50, 75, 75, 50, 100, 50);
        canvas.bezierCurveTo(125, 50, 150, 75, 150, 100);
        canvas.bezierCurveTo(150, 125, 125, 150, 100, 150);

        canvas.moveTo(100,0);
        canvas.bezierCurveTo(50, 0, 0, 50, 0, 100);
        canvas.bezierCurveTo(0, 150, 50, 200, 100, 200);
        canvas.bezierCurveTo(150, 200, 200, 150, 200, 100);
        canvas.bezierCurveTo(200, 50, 150, 0, 100, 0);

        canvas.stroke();
        // canvas.fill();

        // canvas.lineTo(100, 150);
        // canvas.moveTo(100, 150);
        // canvas.bezierCurveTo(75, 150, 50, 125, 50, 100);
        // canvas.bezierCurveTo(50, 75, 75, 50, 100, 50);
        // canvas.bezierCurveTo(125, 50, 150, 75, 150, 100);
        // canvas.bezierCurveTo(150, 125, 125, 150, 100, 150);
        // canvas.stroke();
        canvas.fill();
      }
    }
  }
</script>

<style>
  .el-tab-pane {
    background-color: #1099bb;
  }
</style>
