<template>
  <div>
    <el-tabs theme="dark" v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
      >
        <el-btn v-on:btn-click="btnClick"></el-btn>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ElBtn from './Button.vue'

  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1'
        }, {
          title: 'Tab 2',
          name: '2',
          content: '<el-btn></el-btn>'
        }],
        tabIndex: 2
      }
    },
    components: {
      ElBtn
    },
    events:{
    },
    methods: {
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
