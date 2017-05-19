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
        this.initPixi();
        this.showObjs();
      });
    },
    methods: {
      initPixi:function(){
        this.app = new PIXI.Application(1600, 900, {backgroundColor : 0x1099bb});
        document.getElementById('pixi').appendChild(this.app.view);
      },
      showObjs : function() {
        for(let i = 0;i<100;i++) {
          let x = (this.app.renderer.width) * Math.random();
          let y = (this.app.renderer.height) * Math.random();
          this.addObjs(x,y);
        }

      },
      addObjs: function(x,y) {

        // create a new Sprite from an image path
        var bunny = PIXI.Sprite.fromImage('/static/images/fj.svg');

        // center the sprite's anchor point
        bunny.anchor.set(0.5);

        // move the sprite to the center of the screen
        bunny.x = x;
        bunny.y = y;

        this.app.stage.addChild(bunny);

        // Listen for animate update
        this.app.ticker.add(function(delta) {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent tranformation
            bunny.rotation += 0.1 * delta;
        });
      }
    }
  }
</script>

<style>
  .el-tab-pane {
    background-color: #1099bb;
  }
</style>
