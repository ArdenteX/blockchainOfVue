<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div v-if="activeDiv === 'Three'">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref = "formInline" style="text-align: center; padding-top: 5px">
              <el-form-item label="搜索区块名">
                <el-input v-model="formInline.item" placeholder="请输入区块名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="open('formInline')">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="activeDiv === 'One' || activeDiv === 'Two' || activeDiv === 'Four'" style="padding-left: 5px;padding-right: 5px">
            <el-form :inline="true" :model="stuNumLine" class="stuNum" ref = "findOne" style="text-align: center">
              <el-form-item label="学生号">
                <el-input v-model="stuNumLine.item" placeholder="请输入学生学号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="findOne('findOne')">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="activeDiv === 'Two' || activeDiv === 'Four'" style="padding-left: 5px;padding-right: 5px">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                v-loading="loading">
              <el-table-column
                  fixed
                  prop="stu_num"
                  label="学号"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="stu_name"
                  label="姓名"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="sex"
                  label="性别"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="school"
                  label="学校"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="birthday"
                  label="生日"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="major"
                  label="专业"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="email"
                  label="邮箱"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="education"
                  label="学历"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="degreeType"
                  label="学位类型"
                  width="120">
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="250">
                <template slot-scope="scope">

                  <el-link type="primary">
                    <el-button icon="el-icon-circle-plus" @click="checkClick(scope.row)" type="text" size="small" >验证证书</el-button>
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                page-size="6"
                :total="total"
                @current-change ="page">
            </el-pagination>
          </div>
          <div v-if="activeDiv !== 'One'" style="padding-left: 5px;padding-right: 5px">
            <el-table
                :data="tableData3"
                border
                style="width: 100%">
              <el-table-column
                  fixed
                  prop="blockName"
                  label="本节点可供查询区块"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="hash"
                  label="哈希值"
                  width="550">
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="250">
                <el-link class="DLink" type="primary"></el-link>
                <template slot-scope="scope">
                  <el-button icon="el-icon-circle-plus" @click="getClick2(scope.row)" type="text" size="small">申请获取区块公钥</el-button>
                  <el-button icon="el-icon-circle-plus" @click="getClick1(scope.row)" type="text" size="small" >查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                page-size="6"
                :total="total3"
                @current-change ="page3">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "companyOperation",
  data() {
    return {
      loading:false,
      stuNum:'',
      bn:'',
      total:null,
      total3:null,
      tableData: null,
      formLabelWidth:'120px',
      activeDiv:'Three',
      reName: '',

      formInline: {
        item: '',
      },
      stuNumLine:{
        item:'',
      },
      checkLine:{
        item:'',
      },
      tableData3:''
    }
  },
  methods: {
    open(formName) {
      this.$refs[formName].validate((valid) => {
        const _this = this;
        this.bn = this.formInline.item
        axios.post("/api/companies/findWhat", this.formInline).then(function (resp) {
          if (resp.data === "ok") {
            _this.$message({
              type: "success",
              message: "验证成功，请输入密钥！"
            })
            _this.$prompt('请输入密钥(公钥)', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({value}) => {
              const name = _this.formInline.item;
              let list = {
                item: value
              }
              axios.post("/api/companies/findWhat/check/"+name,list).then(function (res){
                if(res.data === "ok"){
                  _this.$message({
                    type:"success",
                    message:"密钥验证成功！欢迎进入区块 '" + name + "'"
                  })
                  _this.activeDiv = 'One'
                  //_this.$router.push("/findStudent")

                }
                if(res.data === "error"){
                  _this.$message.error("密钥不正确！")
                }

              })

            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
          } else {
            _this.$message.error("不存在此区块名！");
          }
        })
      });
    },
    goBack() {
      this.activeDiv = 'Three'
      console.log('go back');
    },

    findOne(formName){
      this.$refs[formName].validate((valid) =>{
          const _this = this;
          axios.post("/api/companies/findWhat/check/findOne/"+_this.bn,this.stuNumLine).then(function (resp){
            console.log(resp.data)
            _this.tableData = [{
              stu_num: resp.data.stu_num,
              stu_name: resp.data.stu_name,
              sex: resp.data.sex,
              school:resp.data.school,
              birthday: resp.data.birthday,
              major: resp.data.major,
              email: resp.data.email,
              education: resp.data.education,
              degreeType:resp.data.degreeType
            }]
            _this.stuNum = resp.data.stu_num
            _this.activeDiv = 'Two'
          })
      })
    },

    getClick2(row){
      axios.get("/api/auth/getMsg/"+ window.sessionStorage.getItem("username")).then(function(resp){
        console.log(resp)
        window.sessionStorage.setItem("organizationName",resp.data.item)
        window.sessionStorage.setItem("email",resp.data.item2)
      })
        const _this = this;
        const blockName = row.blockName
        const toMail = window.sessionStorage.getItem("email")
        console.log("blockName = "+blockName +"  toMail = " +toMail)
        axios.get("/api/companies/requestPublicKey/"+blockName+"/"+toMail).then(function (resp){
          console.log(resp)
            if(resp.data === 'success'){
              _this.$message({
                type:"success",
                message:'已发送公钥至您的邮箱'
              })
            }
            else {
              _this.$message.error("出错了")
            }
        })
    },

    getClick1(row){
      console.log(row);
      this.hash = row.hash
      this.bn = row.blockName
      this.$prompt('请输入密钥(公钥)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        const name = row.blockName;
        let list = {
          item: value
        }
        const _this = this;
        axios.post("/api/companies/findWhat/check/"+row.blockName,list).then(function (res){
          if(res.data === "ok"){
            _this.$message({
              type:"success",
              message:"密钥验证成功！欢迎进入区块 '" + name + "'"
            })
            _this.reName = name

            _this.activeDiv = 'One'

            //_this.$router.push("/findStudent")

          }
          if(res.data === "error"){
            _this.$message.error("密钥不正确！")
          }

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },

    page3(currentPage){
      const _this = this
      axios.get("/api/companies/BlockByOrgName/"+currentPage+"/6").then(function (resp){
        _this.tableData3 = resp.data.content
        _this.total3 = resp.data.totalElements
      })
    },

    checkClick(row){
      this.$prompt('请输入证书验证码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let list = {
          item: value
        }
        const _this = this;
        axios.post("/api/companies/findWhat/check/CheckCertificate/"+row.stu_num+"/"+this.reName,list).then(function (res){
          if(res.data === "success"){
            _this.$message({
              type:"success",
              message:"验证成功"
            })

            // _this.activeDiv = 'One'

            //_this.$router.push("/findStudent")

          }
          if(res.data === 'notFound'){
            _this.$message.error("找无此证书")
          }
          if(res.data === "Invalid"){
            _this.$message.error("验证码出错")
          }
          if(res.data === "error"){
            _this.$message.error("出错了！")
          }

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },

    handleClick(row){
      this.stu_num = row.stu_num;
      console.log(row);
      console.log(row.stu_num)
      window.location = 'api/blockChainUsers/file/download/'+this.stu_num
    },

  },

  created(){
    const _this = this
    axios.get("/api/companies/BlockByOrgName/1/6").then(function (resp){
      console.log(resp)
      _this.tableData3 = resp.data.content
      _this.total3 = resp.data.totalElements
    })

  },



}


</script>

<style scoped>
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
  min-height: 650px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>