<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in blockName" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref = "formInline" >
        <el-form-item label="区块名">
          <el-input v-model="formInline.item" placeholder="输入区块名以搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="findClick('formInline')">搜索</el-button>
          <el-button type="success" plain @click="showClick">注册新用户</el-button>
        </el-form-item>
      </el-form>
    </div>


    <div v-if="activeDiv === 'A'">
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="blockName"
            label="区块"
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
            width="1000">
          <el-link class="ALink" type="primary"></el-link>
          <template slot-scope="scope">
            <el-button icon="el-icon-circle-plus" @click="getClick(scope.row)" type="text" size="small" >查看</el-button>
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

    <div v-if="activeDiv === 'B' || activeDiv === 'C'">
      <el-table
          :data="tableData1"
          border
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
            width="750">
          <template slot-scope="scope1">

            <el-link class="BLink" type="primary">
              <el-button icon="el-icon-circle-plus" @click="checkClick(scope1.row)" type="text" size="small" >验证证书</el-button>
              <el-button icon="el-icon-download" @click="handleClick(scope1.row)" type="text" size="small" >下载证书</el-button>
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          page-size="6"
          :total="total1"
          @current-change ="page1">
      </el-pagination>
    </div>

    <div v-if="activeDiv === 'C'">
      <span class="demonstration">上传证书以验证</span>
      <el-upload style="width: 70%"
                 :action="'http://172.16.0.17:8181/api/companies/findWhat/check/CheckCertificate/'+stu_num+'/'+bn"
                 list-type="picture-card"
                 :on-preview="handlePictureCardPreview"
                 :on-remove="handleRemove"
                 :on-success="uploadSuccess"
                 :on-error="uploadError">
        <div slot="tip" class="el-upload__tip">只能上传jpg/png照片</div>
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

    <div v-if="activeDiv === 'D'">
      <el-table
          :data="tableData2"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="bName"
            label="区块"
            width="200">
        </el-table-column>
        <el-table-column
            prop="Hash"
            label="哈希值"
            width="550">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="1000">
          <el-link class="DLink" type="primary"></el-link>
          <template slot-scope="scope">
            <el-button icon="el-icon-circle-plus" @click="getClick(scope.row)" type="text" size="small" >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="activeDiv === 'E'">
      <el-card class="box-card">

          <div slot="header" class="clearfix">
            <span>注册</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="registerClick('registerForm')" ref="registerForm">确定</el-button>
          </div>
          <div class="text item">
            <el-form :inline="true" :model="registerForm" class="registerForm" ref = "registerForm">
              <el-form-item label="ID">
                <el-input v-model="registerForm.item" placeholder="输入组织/机构ID"></el-input>
              </el-form-item>

              <el-form-item label="角色" style="font-size: 15px">
                <el-radio-group v-model="registerForm.item2">
                  <el-radio label="企业"></el-radio>
                  <el-radio label="高校"></el-radio>
                  <el-radio label="管理者"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>

      </el-card>
    </div>



  </div>

</template>

<script>
  export default {
    name: 'blockOperation',
    data() {
      return {
        show2: true,
        dialogImageUrl: '',
        dialogVisible: false,
        total: null,
        tableData: null,
        tableData1: null,
        tableData2: '',
        total1: null,
        stu_num: '',
        bn: '',
        hash: '',
        activeDiv: "A",
        blockName: [],
        formInline: {
          item: '',
        },
        registerForm: {
          item: '',
          item2: '',
        }
      }
    },
    methods: {
      getClick(row) {
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
          axios.post("/api/schools/findWhat/check/" + row.blockName, list).then(function (res) {
            if (res.data === "success") {
              _this.$message({
                type: "success",
                message: "密钥验证成功！欢迎进入区块 '" + name + "'"
              })

              _this.activeDiv = 'B'
              axios.get("/api/schools/findAll/" + name + "/1/6").then(function (resp) {
                console.log(resp.data)
                console.log(resp)
                _this.tableData1 = resp.data.content
                _this.total1 = resp.data.totalElements
              })

              //_this.$router.push("/findStudent")

            }
            if (res.data === "error") {
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

      goBack() {
        this.activeDiv = 'A'
      },

      checkClick(row) {
        this.stu_num = row.stu_num
        this.$prompt('请输入证书验证码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let list = {
            item: value
          }
          const _this = this;
          axios.post("/api/companies/findWhat/check/CheckCertificate/" + row.stu_num + "/" + this.reName, list).then(function (res) {
            if (res.data === "success") {
              _this.$message({
                type: "success",
                message: "验证成功"
              })

              // _this.activeDiv = 'One'

              //_this.$router.push("/findStudent")

            }
            if (res.data === 'notFound') {
              _this.$message.error("找无此证书")
            }
            if (res.data === "Invalid") {
              _this.$message.error("验证码出错")
            }
            if (res.data === "error") {
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


    findClick() {
      const _this = this;
      axios.post("/api/blockChainUsers/findOne", this.formInline).then(function (resp) {
        if (resp != null) {
          _this.$message({
            type: "success",
            message: "区块确认"
          })
          _this.activeDiv = 'D'
          _this.tableData2 = [{
            bName: _this.formInline.item,
            Hash: resp.data.hash
          }]
        }
      })
    },

    showClick() {
      this.activeDiv = 'E'
    },

    registerClick(formName) {
      if (this.registerForm.item2 === '企业') this.registerForm.item2 = 'ROLE_COMPANY'
      if (this.registerForm.item2 === '高校') this.registerForm.item2 = 'ROLE_SCHOOL'
      if (this.registerForm.item2 === '管理者') this.registerForm.item2 = 'ROLE_ADMIN'
      const _this = this
      axios.post("/api/blockChainUsers/register", this.registerForm).then(function (resp) {
        console.log(resp)
        if (resp.data === 'success') {
          _this.$message({
            type: "success",
            message: "注册成功！"
          })

          _this.activeDiv = 'A'
          axios.get("/api/blockChainUsers/allBlock/1/6").then(function (resp) {
            console.log(resp.data)
            console.log(resp)
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
          })

        }

      })
    },

    page(currentPage) {
      const _this = this
      axios.get("/api/blockChainUsers/allBlock/" + currentPage + "/6").then(function (resp) {
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },

    page1(currentPage) {
      const _this = this
      axios.get("/api/schools/findAll/" + _this.bn + "/" + currentPage + "/6").then(function (resp) {
        _this.tableData1 = resp.data.content
        _this.total1 = resp.data.totalElements
      })
    },

    handleClick(row) {
      console.log(row)
      this.loading = true
      const _this = this
      axios.get('/api/file/download/' + row.stu_num, {
        responseType: 'blob', // 或者responseType: 'blob'
      }).then(function (res) {
        _this.loading = false
        const blob = new Blob([res.data], {
          type: 'application/x-png'
        })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', row.stu_num + ".png")
        document.body.appendChild(link)
        link.click()
        document.removeChild(link)
        window.URL.revokeObjectURL(link.href)

        //window.location.href = objectUrl+'.png'
      }).catch(err => {
        console.log(err)
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(response, file, fileList) {
      if (response === 'error') {
        this.$message.error("文件传输出错，请重试！")
      }
      if (response === 'notFound') {
        this.$message.error("查无此证书！")
      }
      if (response === 'Invalid') {
        this.$message.error("证书无效！")
      }
      if (response === 'success') {
        this.$message({
          showClose: true,
          message: '认证成功！！',
          type: 'success'
        });
      }
      console.log(response);
      console.log("上传成功file" + file);
      console.log("上传成功fileList" + fileList)
    },
    uploadError(response, file, fileList) {
      console.log("上传失败！" + response);
      console.log("上传失败file" + file);
      console.log("上传失败fileList" + fileList)
    },
  },

    created() {
      const _this = this;
      axios.get("/api/blockChainUsers/recent").then(function (resp){
        console.log(resp.data)
        _this.blockName = resp.data
      })

      axios.get("/api/blockChainUsers/allBlock/1/6").then(function (resp){
        console.log(resp.data)
        console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })

    },

  }
</script>









<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 16px;
  opacity: 0.75;
  line-height: 200px;
  width: 15%;
  margin:0 auto;

}
.text {
  font-size: 15px;
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
  width: 480px;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 65px;
  font-size: 20px;
}
</style>