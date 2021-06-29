<template>
  <div>
    <el-header>
      Academic degree certification
      <el-dropdown style="float: right">
        <el-button type="primary" >
          用户<i class="el-icon-arrow-down el-icon--right el-icon-user-solid"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" @click="changeUser">
              用户操作
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="logout" >
              退出
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container style="height: 700px; :solid #eee; background-color: #d3dce6">
      <el-aside  width="15%" style="background-color: #F8F8FF">
        <el-menu router :default-openeds="['0','1']" background-color="#F8F8FF"
                 text-color="#000000"
                 active-text-color="#00BFFF">
          <el-submenu v-for="(item,index) in this.routes" :index="index+''" >
            <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
            <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" v-if="item2.name !== '用户'"
                          :class="$route.path == item2.path?'is-active':''">
              {{item2.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>
<script>
export default {
  name: "Index",

  computed:{
    routes(){
      return this.$store.state.routes
    }
  },

  methods:{
    changeUser(){
      this.$router.push({path:"/UserOperation",params:{activeDiv:"A"}})
    },
    logout(){
      this.$store.commit('logout')
      this.$router.push({path:"/logout"})
    }
  },

}
</script>

<style scoped>
.el-header{
  background-color: #5555fb;
  color: #F8F8FF;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>