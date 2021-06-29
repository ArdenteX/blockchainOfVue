<template>
  <div>

    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content bg-purple" style="padding-left: 5px;padding-right: 5px">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" ref = "formInline" style="padding-top: 5px;padding-right: 5px">
            <el-form-item label="区块名">
              <el-input v-model="formInline.item" placeholder="请输入区块名"></el-input>
            </el-form-item>
            <el-form-item style="padding-left: 5px;padding-right: 5px">
              <el-button type="primary" icon="el-icon-search" @click="open('formInline')">搜索</el-button>
              <el-button type="success" plain @click="showClick(row)">授权企业</el-button>
            </el-form-item>
          </el-form>
          <div v-if="activeDiv === 'Two'" style="padding-left: 5px;padding-right: 5px">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%">
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
                    <el-button icon="el-icon-download" @click="handleClick(scope.row)" type="primary" size="small">下载证书</el-button>
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

          <div v-if="activeDiv !== 'Three' && activeDiv !== 'E'" style="padding-left: 5px;padding-right: 5px">
            <el-table
                :data="tableData3"
                border
                style="width: 100%">
              <el-table-column
                  fixed
                  prop="blockName"
                  label="已上传区块"
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

          <div v-if="activeDiv === 'E'" style="padding-left: 5px;padding-right: 5px">
            <el-card class="box-card">

              <div slot="header" class="clearfix">
                <span>授权</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="registerClick('registerForm')" ref="registerForm">确定</el-button>
              </div>
              <div class="text item">
                <el-form :inline="true" :model="registerForm" class="registerForm" ref = "registerForm">
                  <el-form-item label="ID">
                    <el-input v-model="registerForm.item" placeholder="输入企业ID"></el-input>
                  </el-form-item>
                </el-form>
              </div>

            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>


</template>

<script>
export default {
  name: "PageFour",
  data() {
    return {
      stu_num:'',
      loading:false,
      total:null,
      tableData: null,
      blockName:'',
      tableData3:null,
      total3:null,
      formLabelWidth:'120px',
      activeDiv:'One',
      formInline: {
        item: '',
      },
      registerForm:{
        item:'',
      }

    }
  },
  methods: {
    open(formName) {
      this.$refs[formName].validate((valid) => {
        const _this = this;
        this.blockName = this.formInline.item
        axios.post("/api/schools/findWhat", this.formInline).then(function (resp) {
          if (resp.data === "ok") {
            _this.$message({
              type: "success",
              message: "验证成功，请输入密钥！"
            })
            _this.$prompt('请输入密钥(私钥)', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({value}) => {
              const name = _this.formInline.item;
              let list = {
                  item: value
              }
              axios.post("/api/schools/findWhat/check/"+name,list).then(function (res){
                if(res.data === "success"){
                  _this.$message({
                    type:"success",
                    message:"密钥验证成功！欢迎进入区块 '" + name + "'"
                  })
                  _this.activeDiv = 'Two'
                  axios.get("/api/schools/findAll/"+name+"/1/6").then(function (resp){
                    _this.tableData = resp.data.content
                    _this.total = resp.totalElements
                  })

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
    page(currentPage){
      const _this = this
      axios.get("/api/schools/findAll/"+currentPage+"/6").then(function (resp){
        _this.tableData = resp.data.content
        _this.total = resp.totalElements
      })
    },

    registerClick(formName){
      const _this = this
      axios.post("/api/schools/register",this.registerForm).then(function (resp){
        console.log(resp)
        if(resp.data === 'success'){
          _this.$message({
            type:"success",
            message:"授权成功！"
          })
          _this.registerForm.item = ''
          _this.activeDiv = 'A'
          axios.get("/api/schools/BlockByOrgName/1/6").then(function (resp){
            console.log(resp.data)
            console.log(resp)
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
          })

        }

      })
    },

    handleClick(row){
      console.log(row)
      this.loading = true
      const _this = this
      axios.get('/api/file/download/'+row.stu_num, {
        responseType: 'blob', // 或者responseType: 'blob'
      }).then(function (res) {
        _this.loading = false
        const blob = new Blob([res.data], {
          type: 'application/x-png'
        })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download',row.stu_num+".png")
        document.body.appendChild(link)
        link.click()
        document.removeChild(link)
        window.URL.revokeObjectURL(link.href)

        //window.location.href = objectUrl+'.png'
      }).catch(err => {
        console.log(err)
      })

    },

    showClick(){
      if(this.activeDiv === 'E'){
        this.activeDiv = 'A'
      }
      else {
        this.activeDiv = 'E'
      }
    },

    page3(currentPage){
      const _this = this
      axios.get("/api/schools/BlockByOrgName/"+currentPage+"/6").then(function (resp){
        _this.tableData3 = resp.data.content
        _this.total3 = resp.totalElements
      })
    },

    getClick1(row){
      console.log(row);
      this.hash = row.hash
      this.bn = row.blockName
      this.$prompt('请输入密钥(私钥)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        const name = row.blockName;
        let list = {
          item: value
        }
        const _this = this;
        axios.post("/api/schools/findWhat/check/"+row.blockName,list).then(function (res){
          if(res.data === "success"){
            _this.$message({
              type:"success",
              message:"密钥验证成功！欢迎进入区块 '" + name + "'"
            })
            _this.reName = name
            _this.activeDiv = 'Two'
            axios.get("/api/schools/findAll/"+name+"/1/6").then(function (resp){
              _this.tableData = resp.data.content
              _this.total = resp.totalElements
            })


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
    }
  },

  created(){
    const _this = this
    axios.get("/api/schools/BlockByOrgName/1/6").then(function (resp){
      _this.tableData3 = resp.data.content
      _this.total3 = resp.totalElements
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
  min-height: 500px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>