<template>
  <div>
    <div id="login">

      <el-card class="box-card" style="width: 500px;height: 350px" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span>Welcome</span>
        </div>
        <div class="text item">
          <el-form>
            <div style="margin: 20px;"></div>
            <el-form  :label-position="labelPosition" :model="formLabelAlign" style="width: 60%">
              <el-form-item class="box"  label="Username" >
                <el-input type="text" v-model="formLabelAlign.username"></el-input>
              </el-form-item>

              <el-form-item class="box" label="Password">
                <el-input type="password" v-model="formLabelAlign.password"></el-input>
              </el-form-item>

              <el-button type="primary" style="float: left" @click="loginClick('loginClick')">Login</el-button>

            </el-form>
          </el-form>
        </div>
      </el-card>


    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name:'login',
    data() {
      return {
        labelPosition: 'right',
        loading: false,
        formLabelAlign: {
          username: '',
          password: '',
        }
      }
    },
  methods:{
    loginClick(){
      this.loading = true
      const _this = this;
      axios.post("/auth/login",{username:this.formLabelAlign.username,password:this.formLabelAlign.password}).then(function (resp){
        console.log(resp)
        _this.loading = false
        if(resp.data.status === 200){
          window.sessionStorage.setItem("token",resp.headers.token)
          window.sessionStorage.setItem("username",resp.data.msg.username)
          window.sessionStorage.setItem("role",resp.data.msg.authorities[0].authority)

          console.log(resp.data.msg.authorities[0].authority)
          console.log(resp.data.msg.username)
          console.log(resp.headers.token)

          axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem("token");


          var path = _this.$route.query.redirect;
          _this.$router.replace({path: path === '/' || path === undefined? '/Home':path})

        }
        else {
          _this.$message.error("密码不正确或账户不存在！")
        }
      })
    }
  }
  }
</script>

<style>
.box{
  text-align: center;
}


#login{
  height: 1000px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/BG.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-card{
  align-items: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 500px;
}


</style>