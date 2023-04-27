<template>
  <el-main>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
       
        <el-form-item label="教师名称:">
          <el-input v-model="formInline.name" placeholder="教师名称"></el-input>
        </el-form-item>

        <el-form-item label="头衔:">
          <el-input v-model="formInline.level" placeholder="头衔"> </el-input>
        </el-form-item>

        <el-form-item label="开始日期:">
            <el-date-picker
              :editable="false"
              v-model="formInline.begin"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="结束日期:">
            <el-date-picker
            :editable="false"
              v-model="formInline.end"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
            <el-button icon="el-icon-plus" size="medium" type="primary" @click="handleInsert">添加</el-button>
        </el-form-item>
      </el-form>

      <!-- 添加弹出框 -->
          <el-dialog title="添加" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="formInsert" label-width="120px" >
              <el-row>
                <el-col :span="12">
                <el-form-item label="讲师姓名" >
                  <el-input v-model="formInsert.name"></el-input>
                </el-form-item>
             

              <el-form-item label="讲师排序" >
                <el-input-number v-model="formInsert.sort" controls-position="right" :min="1" :max="10"></el-input-number>
              </el-form-item>
 
              <el-form-item label="讲师头衔" >
                <el-select v-model="formInsert.level" placeholder="请选择">
                  <el-option label="高级讲师" :value="1"></el-option>
                  <el-option label="首席讲师" :value="2"></el-option>
                </el-select>
              </el-form-item>
              </el-col>

              <el-col :span="12">

                <el-upload
                  style="text-align: center"
                  class="avatar-uploader"
                  action="http://192.168.43.128:9001/eduoss/fileoss"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-col> 


            </el-row>


              <el-form-item label="讲师资历" >
                  <el-input v-model="formInsert.career"></el-input>
              </el-form-item>

              <el-form-item label="讲师简介" >
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="formInsert.intro">
              </el-input>
            </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="insert">确 定</el-button>
            </div>
          </el-dialog>
      <!-- 添加弹出框 -->

      <el-table :data="tableData" height="620" border>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>

        <el-table-column prop="name" label="名称" width="140">
        </el-table-column>

        

        <el-table-column label="姓名" width="120">
          <template slot-scope="scope">
            {{scope.row.level===1?'高级讲师':'首席讲师'}}
          </template>
        </el-table-column>

        <el-table-column prop="intro" label="资历" width="140"> </el-table-column>
     
        <el-table-column prop="gmtCreate" label="添加时间" > </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible2" >
            <el-form :model="formInsert" label-width="120px" >
              <el-row>
                <el-col :span="12">
                <el-form-item label="讲师姓名" >
                  <el-input v-model="formInsert.name"></el-input>
                </el-form-item>
             
             
              <el-form-item label="讲师排序" >
                <el-input-number v-model="formInsert.sort" controls-position="right" :min="1" :max="10"></el-input-number>
              </el-form-item>

              <el-form-item label="讲师头衔" >
                <el-select v-model="formInsert.level" placeholder="请选择">
                  <el-option label="高级讲师" :value="1"></el-option>
                  <el-option label="首席讲师" :value="2"></el-option>
                </el-select>
              </el-form-item>
              </el-col>

              <el-col :span="12">
              <el-upload
                  style="text-align: center"
                  class="avatar-uploader"
                  action="http://192.168.43.128:9001/eduoss/fileoss"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-col> 

            </el-row>

              <el-form-item label="讲师资历" >
                  <el-input v-model="formInsert.career"></el-input>
              </el-form-item>

              <el-form-item label="讲师简介" >
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="formInsert.intro">
              </el-input>
            </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="edit">编 辑</el-button>
            </div>
          </el-dialog>
      <!-- 编辑弹出框 -->
      <el-row>
        <el-col :span="6"  style="padding:24px 0">
          <el-pagination background layout="total,prev, pager, next" 
          :total="total"
          :current-page="current"
          @current-change="query">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>

  </el-main>
  
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


<script>


export default {
  name: "TeacherList",
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2:false,
      formInsert: {}, //添加和编辑的表单对象
      tableData: [],//老师列表
      formInline: {  //搜索关键字
        name: "",
        level: "",
        begin: '',
        end:''
      },
      current:1, //当前页
      size:10, //每页显示条数
      total:0,  //总记录数

      avatarUrl: ''//用户头像
    };
  },
  methods: {
      handleAvatarSuccess(res, file) {
        this.avatarUrl = res.data.url

      },
      
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

    onSubmit() {
      this.query();
    },

    resetForm() {
      // this.$refs[formName].resetFields();
      this.formInline = {}
    },

    query(page = 1) {
      this.current = page
      this.request.post(`/edu/teacher/queryTeacher/${this.current}/${this.size}`, 
      {
        name: this.formInline.name,
        level: this.formInline.level,
        begin: this.formInline.begin,
        end : this.formInline.end
      }
      ).then(resp => {
        this.tableData =  resp.data.teacherList,
        this.total = resp.data.total
      });
    },

    delete(id){
      this.request.delete(`/edu/teacher/${id}`)
      .then(resp => {
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.query(this.current)
      })
    },
    handleInsert(){
        this.dialogFormVisible=true
        this.formInsert = { //初始化表单数据
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro:''
        }
        this.avatarUrl = ''

      },
    insert(){
      this.request.post(`/edu/teacher/teacher/`,{
          name: this.formInsert.name,
          sort: this.formInsert.sort,
          level: this.formInsert.level,
          career: this.formInsert.career,
          intro: this.formInsert.intro,
          avatar: this.avatarUrl

      }).then(resp => {
        this.dialogFormVisible=false
        this.$message({
            type: 'success',
            message: '添加成功!'
          });
        this.query(this.current)
      })
    },
    getEditData(id){
   
      this.request.get(`/edu/teacher/edit/${id}`).then(resp =>{
        this.formInsert = resp.data.teacher
        this.avatarUrl = resp.data.teacher.avatar
      })
    
    },

    handleEdit(id) {
      this.dialogFormVisible2=true
      this.getEditData(id)

    },
    edit(id){
      this.request.put(`/edu/teacher/teacher/`,{
          id : this.formInsert.id,
          name: this.formInsert.name,
          sort: this.formInsert.sort,
          level: this.formInsert.level,
          career: this.formInsert.career,
          intro: this.formInsert.intro,
          avatar: this.avatarUrl
      }).then(resp => {
        this.dialogFormVisible2=false
        this.$message({
            type: 'success',
            message: '编辑成功!'
          });
        this.query(this.current)
      })

    },
   

      handleDelete(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete(id);
         
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

    
  },
  created() {
    this.query();
  },
};
</script>

<style>
</style>