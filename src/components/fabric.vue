<template>
  <div>
    <el-button type="info"  @click="loadCanvasData">加载数据</el-button>
    <template v-for="(item,index) in tunnelList">
      <el-button type="success"  @click="showDoc(item.Id)">{{item.Name}}</el-button>
    </template>
    <el-tabs v-model="editableTabsValue" type="card" @edit="handleTabsEdit">
      <el-tab-pane
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
      v-html="item.content"
      >
      </el-tab-pane>
    </el-tabs>
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
        tunnelList: [],
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
      this.getTunnelList();
    },
    methods: {
      loadCanvasData () {
        this.docList.forEach(item => {
          let canvas = new fabric.Canvas(item.id,{backgroundColor:'#1099bb'});
          canvas.loadFromJSON(item.canvas, function(){
            canvas.renderAll();
          });
        })

      },
      showDoc (id) {
        axios.get('/server/getDocData?id='+id).then(res => {
          // console.log(res);
          if(res.data.flag) {
            this.editableTabs = [];
            this.docIdList = [];
            this.docList = [];
            res.data.data.forEach(item => {
              let newTabName = ++this.tabIndex + '';
              this.editableTabs.push({
                title: item.name,
                name: newTabName,
                content: '<canvas id="'+item.id+'" width="'+item.size.width+'" height="'+item.size.height+'"></canvas>'
              });
              this.editableTabsValue = newTabName;
              this.docIdList.push(item.id);
              this.docList.push(item);
              // new fabric.Canvas(item.id,{backgroundColor:'#1099bb'});
              // this.loadCanvasData(item);
            })

          }
        })
      },
      getTunnelList () {
        axios.get('/server/getTunnelList').then(res => {
          console.log(res);
          if(res.data.flag) {
            this.tunnelList = res.data.data;
          }
          console.log(this.tunnelList);
        })
      },
      btnClick(){
        console.log(44);
        this.$emit('btn-click',true);
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content '+ newTabName
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  }
</script>

<style>
  .el-tab-pane {
    background-color: #1099bb;
  }
</style>
