<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<style>
.el-header {
  background-color: #483D8B;
  color: #333;
  line-height: 65px;
  font-size: 20px;
}

.el-aside {
  color: #333;
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
export default {
  data(){
    return{};
  },
methods:{

}

};
</script>
