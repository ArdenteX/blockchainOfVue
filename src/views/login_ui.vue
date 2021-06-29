<template>
  <div>
      <div class="background">
        <el-image :src="require('@/assets/BG.jpg')" style="height: 100%;width: 100%"></el-image>
      </div>
      <div class="card">
        <el-form>
          <el-image class="user_image" :src="require('@/assets/User.png')"></el-image>
          <div class="container">
            <h2><b>Sign in Form</b></h2>
            <el-form  :label-position="labelPosition" :model="formLabelAlign">
              <el-form-item class="box"  label="Username" >
                <el-input class="textbox" type="text" v-model="formLabelAlign.username"></el-input>
              </el-form-item>
              <el-form-item class="box" label="Password">
                <el-input class="textbox" type="password" v-model="formLabelAlign.password"></el-input>
              </el-form-item>
              <el-button class="btn_signin" @click="loginClick('loginClick')">Login</el-button>
            </el-form>
          </div>
        </el-form>
      </div>
  </div>
</template>

<style>
*{
  font-family: arial;
}

.background{
  position: fixed;
  /*background-image: url("~@/assets/BG.jpg");*/
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.card{
  position: absolute;
  z-index:1;
  width: 25%;
}


p{
  font-size: 13px;
  margin: 0;
}
h2{
  color: #8E44AD;
}

.card {
  /* Add shadows to create the "card" effect */
  margin: 5% 35% 0 35%;
  padding: 25px;
  background-color: #EAEDED;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
/*Add textbox style*/
.textbox{
  margin-bottom: 25px;
  padding: 5px;
  border: 0;
  background-color: #EAEDED;
  border-bottom: 2px solid #8E44AD;
  font-size: 15px;
}
/*Add user img style*/
.user_image{
  width: 200px;
  height: 200px;
}
/*Add style for sign in button */
.btn_signin{
  margin-top: 15px;
  width: 150px;
  border:0;
  background-color: #2ECC71;
  color: #fff;
  padding: 10px 25px 10px 25px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
/*On mouse-over, add a deeper shadow*/
.btn_signin:hover{
  font-size: 15px;
  font-weight: bold;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
  background-color: #239B56;
}
/*Add style for sign in button */
.btn_clear{
  width: 150px;
  border:0;
  background-color: #E74C3C;
  color: #fff;
  padding: 10px 25px 10px 25px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
/*On mouse-over, add a deeper shadow*/
.btn_clear:hover{
  font-size: 15px;
  font-weight: bold;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
  background-color: #B03A2E;
}

</style>
<script>
import axios from "axios";

export default {
  name:'login',
  data() {
    return {
      labelPosition: 'right',
      loading: false,
      url:'~@/assets/User.png',
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


          axios.get("/api/auth/getMsg/"+ window.sessionStorage.getItem("username")).then(function(resp){
            window.sessionStorage.setItem("organizationName",resp.data.item2)
            window.sessionStorage.setItem("email",resp.data.item)


            if(resp.data.item2 === null){
              _this.$message({
                type:"warning",
                message:"请完善身份信息后进行操作！"
              })
              _this.$router.push('/UserOperation')
            }

          })

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