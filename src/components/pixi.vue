<template>
  <div>
    <div class="pixi" id="pixi">

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
        this.getDeviceList();
        this.switchRender();
        this.initPixi();
      });
    },
    methods: {
      initPixi:function(){
        this.container = new PIXI.Container();
        this.app = new PIXI.autoDetectRenderer(1200, 900, {
          backgroundColor : 0x1099bb,
          antialias: true,
          transparent: false,
          preserveDrawingBuffer: true
        });
        document.getElementById('pixi').appendChild(this.app.view);
        this.container.interactive = true;
        this.container.on('pointertap', this.onClick);
      },
      initScada: function() {
        // var scada =
        this.scada = new Scada();
      },
      onClick: function(e,i) {
        console.log(this);
        // console.log(e);
        // console.log(e.data.target);
        // console.log(PIXI.utils.isWebGLSupported());
      },
      renderGroup:function(obj){
        var _objects = obj.objects;
        var x = obj.left-(obj.width/4);
        var y = obj.top - (obj.height/2);
        for(var i in _objects) {
          var graphics = new PIXI.Graphics();
          this.container.addChild(graphics);
          SVGGraphics.drawSVG(graphics, _objects[i]);
          this.setAttribute(graphics,_objects[i]);
          graphics.x = _objects[i].left + x;
          graphics.y = _objects[i].top + y;
        }
        this.app.render(this.container);
      },

      /**
       * 渲染路径的方法 type="path"
       * @param  {Object} obj [description]
       * @return {[type]}     [description]
       */
      renderPath:function(obj){
        this.testdrawfun();
        var graphics = new PIXI.Graphics();
        // console.log(graphics);
        // this.container.setTransform(-100,-10);
        this.container.addChild(graphics);
        SVGGraphics.drawSVG(graphics, obj,this.container);
        this.setAttribute(graphics,obj);
        this.app.render(this.container);
        this.stopTimer();
        // document.getElementById('timeLine').innerHtml(this.stopTimer);
      },
      testdrawfun: function() {
        var graphics = new PIXI.Graphics();
        this.container.addChild(graphics);
        graphics.lineStyle(2, 0xffd900, 1);
        graphics.beginFill(0xFF3300);
        graphics.moveTo(100,0);
        graphics.bezierCurveTo(50, 0, 0, 50, 0, 100);
        graphics.bezierCurveTo(0, 150, 50, 200, 100, 200);
        graphics.bezierCurveTo(150, 200, 200, 150, 200, 100);
        graphics.bezierCurveTo(200, 50, 150, 0, 100, 0);
        // graphics.moveTo(100, 0);
        graphics.closePath();
        graphics.lineTo(100, 150);
        // graphics.lineStyle(1, 0xddff33, 1);
        // graphics.beginFill(0x44ee33);
        graphics.moveTo(100, 150);
        graphics.bezierCurveTo(75, 150, 50, 125, 50, 100);
        graphics.bezierCurveTo(50, 75, 75, 50, 100, 50);
        graphics.bezierCurveTo(125, 50, 150, 75, 150, 100);
        graphics.bezierCurveTo(150, 125, 125, 150, 100, 150);
        graphics.closePath();
        // graphics.endFill();
        this.app.render(this.container);
      },
      setAttribute: function(graphics,obj) {
        graphics.x = obj.left;
        graphics.y = obj.top;
        graphics.width = obj.width;
        graphics.height = obj.height;
        graphics.scale.x = obj.scaleX;
        graphics.scale.y = obj.scaleY;
      },
      switchRender: function() {
        var _this = this;
        this.startTimer();
        // this.scada.on('path',function(obj) {
        //     _this.renderPath(obj);
        // });
        // this.scada.on('path1',function(obj) {
        //     _this.renderPath1(obj);
        // });
        // this.scada.on('group',function(obj) {
        //     _this.renderGroup(obj);
        // });
        this.scada.on('path-group',function(obj) {
          console.log(obj);
            _this.renderPath(obj);
        });
        // this.scada.on('rect',function(obj) {
        //     _this.renderRect(obj);
        // });
        // this.scada.on('svg',function(obj) {
        //     _this.renderSvg(obj);
        // });

      },
      getDeviceList () {
        axios.get('/server/getDeviceList').then(res => {
          var objs = res.data;
          // console.log(objs);
          this.scada.init(objs);
        })
      },
      btnClick(){
        console.log(44);
        this.$emit('btn-click',true);
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
