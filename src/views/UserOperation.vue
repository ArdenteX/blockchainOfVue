<template>

  <div>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple" style="padding-top: 10px; padding-left: 10px">
          <el-button type="primary" plain @click="changeUserDetail" style="margin-bottom: 50px">完善账户信息</el-button>
          <el-button type="primary" plain @click="changeUser">修改密码</el-button>
          <div v-if="activeDiv === 'A'" class="userDetail" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="height: 300px;padding-top: 5px" v-loading="loading">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" style="width: auto"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" style="width: auto"></el-input>
              </el-form-item>
              <el-form-item label="负责人" prop="principal">
                <el-input v-model="ruleForm.principal" style="width: auto"></el-input>
              </el-form-item>
              <el-form-item label="组织/机构名" prop="organizationName">
                <el-input v-model="ruleForm.organizationName" style="width: auto"></el-input>
              </el-form-item>
              <el-button type="primary" plain @click="submitForm('ruleForm')" style="margin-left: 10%">确认</el-button>
            </el-form>
          </div>
          <div v-if="activeDiv === 'B'" class="user">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="height: 200px" v-loading="loading">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.stu_num" style="width: auto"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" style="width: auto"></el-input>
              </el-form-item>
              <el-button type="primary" plain @click="submitForm('ruleForm')" style="margin-left: 10%">确认</el-button>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  name: "UserOperation",
  data() {
    return {
      activeDiv:'C',
      loading:false,
      ruleForm: {
        username: window.sessionStorage.getItem("username"),
        password: '',
        principal:'',
        email: '',
        organizationName: '',
        role:window.sessionStorage.getItem('role')
      },
      rules: {
        username: [
          { required: true, message: '请输入用户id', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' },
        ],
        organizationName: [
          { required: true, message: '请输入组织/机构名', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    changeUserDetail(){
        this.activeDiv = 'A'
    },
    changeUser(){
        this.activeDiv = 'B'
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true
        const _this = this;
        axios.patch("/api/auth/change",this.ruleForm).then(function (resp){
          console.log(_this.data)
          _this.loading = false

          if(resp.data === "修改成功！"){
            window.sessionStorage.setItem("organizationName",_this.ruleForm.organizationName)
            _this.$message({
              message:'修改成功！！',
              type:'success'
            });
            _this.$refs[formName].resetFields();
          }
          else {
            _this.$message.error("错误")
          }
        })
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

  }
}
</script>

<style>

.userDetail{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 50%;
}
.user{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 50%;
}

.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #F8F8FF;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


</style>