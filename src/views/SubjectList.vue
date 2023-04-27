<template>
    <el-main>
        <el-card class="box-card">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item>
                    <el-button icon="el-icon-plus" size="medium" type="primary" @click="handleInsert">添加</el-button>
                </el-form-item>
            </el-form>

            <el-tree :data="courseList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

            <!-- 编辑弹出框👇 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible" >
                <el-upload
                    ref="upload"
                    class="upload-demo"
                    show-file-list
                    drag
                    action="http://192.168.186.43:9001/edu/subject/addSubject"
                    :multiple="false"
                    :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 编辑弹出框👆 -->
        </el-card>
    </el-main>
</template>

<script>
export default {
    data() {
      return {
        dialogFormVisible:false,
        courseList: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleInsert(){
        this.dialogFormVisible=true;
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      getAllCourse(){
        this.request.get('/edu/subject/subject').then(resp=>{
          this.courseList = resp.data.subjectList
        })
      }
    },
    created(){
      this.getAllCourse()
    }

}
</script>

<style>

</style>