<template>
  <div>
    <canvas id="canvas" width="1600" height="900"></canvas>
  </div>
</template>

<script>

  export default {
    props: ['canvasData'],
    data() {
      return {
        // objects: []
      }
    },
    watch: {
      canvasData: function (canvasData) {
        console.log(canvasData);
        var _this = this;
        _this.loadCanvasData(canvasData);
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.initFabric();
        // this.loadCanvasData(this.objects);
      });
    },
    methods: {
      initFabric:function(){
        this.canvas = new fabric.Canvas('canvas',{backgroundColor:'#1099bb'});
      },
      loadCanvasData: function(canvasData) {
        if(!canvasData) {
          return;
        }
        var _this = this;
        canvasData.canvas.background = '#1099bb';
        this.canvas.loadFromJSON(canvasData.canvas, _this.canvas.renderAll.bind(_this.canvas), function(){
          _this.canvas.renderAll();
        });
      }
    }
  }
</script>
