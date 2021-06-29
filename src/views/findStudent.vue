<template>
  <div>
    <el-table
        :data="tableData"
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
          width="950"
          height="100">
        <template slot-scope="scope">
            <el-button icon="el-icon-download" @click="handleClick(scope.row)" type="primary" size="small">下载证书</el-button>
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
</template>

<script>
export default {
  methods: {
    handleClick(data) {
      this.stu_num = data.stu_num;
      console.log(data);
      console.log(data.stu_num)
      window.location = 'api/schools/file/download/'+this.stu_num
    },
    page(currentPage){
      const _this = this
      axios.get("api/schools/findAll/"+currentPage+"/6").then(function (resp){
        _this.tableData = resp.data.content
        _this.total = resp.data.content
      })
    }
  },
  created(){
    const _this = this
    axios.get("api/schools/findAll/1/6").then(function (resp){
      _this.tableData = resp.data.content
      _this.total = resp.data.content
    })

  },
  data() {
    return {
      stu_num:'',
      total:null,
      tableData: null
    }
  }
}
</script>