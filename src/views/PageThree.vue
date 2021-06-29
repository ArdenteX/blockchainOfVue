<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="grid-content bg-purple" style="padding-top: 6px;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 50%"  v-loading="loading" >
            <el-form-item label="学号" prop="stuNum" style="width: 50%">
              <el-input v-model="ruleForm.stu_num"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="stuName" style="width: 50%">
              <el-input v-model="ruleForm.stu_name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日日期" required>
              <el-col :span="11">
                <el-form-item prop="graDate">
                  <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择毕业年份" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="所属学校" prop="school">
              <el-input v-model="ruleForm.school"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
              <el-input v-model="ruleForm.major"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="学位类型" prop="degreeType">
              <el-input v-model="ruleForm.degreeType"></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <el-select v-model="ruleForm.education" placeholder="请选择学生学历">
                <el-option label="本科学士" value="本科学士"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="activeDiv === 'A'">
              <el-upload style="width: 70%"
                         action="http://localhost:8181/api/schools/save/photo"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :headers="token"
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

            <el-form-item label-width="45%">
              <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 5%">保存信息</el-button>
              <el-popover
                  placement="right"
                  :width="400"
                  trigger="click"
              >
                <template #reference>
                  <el-button slot="reference">上链</el-button>
                </template>
                <el-form :model="blockNameForm" :rules="blockRules" ref="blockNameForm" label-width="100px" class="blockName-Form">
                  <el-form-item label="毕业年份" prop="blockName" v-loading="loading">
                    <el-date-picker type="year" format="yyyy" value-format="yyyy" placeholder="选择毕业年份" v-model="blockNameForm.item" style="width: 100%;"></el-date-picker>
                    <el-button type="primary" @click="upLinkForm('blockNameForm')" style="width: 100px ">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                  </el-form-item>
                </el-form>
              </el-popover>
              <el-button @click="resetForm('ruleForm')" style="margin-left: 5%">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

    </el-row>

  </div>

</template>

<script>

export default {
  inject:['reload'],
  name: "PageThree",

  data() {
    return {

      token: {Authorization:window.sessionStorage.getItem("token")},
      loading:'',
      activeDiv:'',
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        stu_num: '',
        stu_name: '',
        sex:'',
        birthday: '',
        school: window.sessionStorage.getItem('organizationName'),
        major:'',
        imagePath:' ',
        email:'',
        degreeType:'',
        education:'',
      },
      blockNameForm:{
        item:''
      },
      blockRules:{
        item:[{ required: true, message: '请输入区块名', trigger: 'blur' },]
      },
      rules: {
        stu_num: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        stu_name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择学生性别', trigger: 'change' },
        ],
        major: [
          { required: true, message: '请输入学生专业', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'string',
            message: '邮箱格式不正确',
            trigger: 'blur',
            transform (value) {
              if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
                return true
              }else{
              }
            }
          },
          { type: 'string', message: '长度不能超过30位', trigger: 'blur', max: 30 }
        ],
        degreeType: [
          { required: true, message: '请输入专业类型', trigger: 'blur' },
        ],
        birthday: [
          {  required: true, message: '请选择日期', trigger: 'change' }
        ],
        education: [
          { required: true, message: '请选择学生学历', trigger: 'change' }
        ]
      }
    };
  },


  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true
        const _this = this;
        axios.post("/api/schools/save",this.ruleForm).then(function (resp){
          console.log(_this.data)
          _this.loading = false
          if(resp.data === "Success"){

            _this.$message({
              message:'保存成功！请上传照片！',
              type:'success'
            });
            _this.activeDiv = "A"
            _this.resetForm(formName);
          }
          else {
            _this.$message.error("错误")
          }
        })
      });
    },


    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    upLinkForm(forName){
      this.$refs[forName].validate((valid) =>{

        this.loading = true

        const _this = this;
        axios.post("/api/schools/save/upLink",this.blockNameForm).then(function (resp){
          console.log(_this.data)
          _this.loading = false
          if(resp.data === "Success！") {
            _this.$message({
              message: '保存成功！',
              type: 'success'
            });

            // axios.get("http://localhost:8181/api/schools/save/upLink/mail").then(function (resp){
            //   if(resp.data === 'Success'){
            //     _this.$message({
            //       message: '已发送信息至您的邮箱！！',
            //       type: 'success'
            //     });
            //   }
            // })
          }
          if(resp.data === "studentsNull"){
            _this.$message.error('没有学生信息保存！');
          }
          if(resp.data === "photosNull"){
            _this.$message.error('没有学生照片保存！');
          }
          if(resp.data === "UnequalLength"){
            _this.$message.error('有学生没上传照片！');
          }
          if(resp.data === "blockNameRepeat"){
            _this.$message.error('年份选择重复');
          }

        })
      })
    },
    uploadSuccess(response,file,fileList){
        console.log("上传成功！"+response);
        console.log("上传成功file" + file);
        console.log("上传成功fileList"+fileList)
      this.$message({
        showClose: true,
        message: '照片上传成功！',
        type: 'success'
      });
      this.reload()
    },
    uploadError(response,file, fileList){
      console.log("上传失败！"+response);
      console.log("上传失败file" + file);
      console.log("上传失败fileList"+fileList)
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

  }
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
  min-height: 450px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>