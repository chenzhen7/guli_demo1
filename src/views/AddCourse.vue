<template>
  <el-main>
        <el-card class="box-card" >

            <el-steps :active="active"  finish-status="success" align-center>
                <el-step title="步骤1" description="填写课程基本信息"></el-step>
                <el-step title="步骤2" description="创建课程大纲"></el-step>
                <el-step title="步骤3" description="最终发布"></el-step>
            </el-steps>

            <el-form v-show="active == 0" ref="form" :model="form" label-width="80px">
              <el-form-item label="课程标题" >
                <el-input v-model="courseForm.title"></el-input>
              </el-form-item>

              <el-form-item label="总课时">
                <el-input-number v-model="courseForm.lessonNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </el-form-item>

              <el-form-item label="课程简介">
                <el-input v-model="courseForm.description"></el-input>
              </el-form-item>

              <el-form-item label="课程价格">
                <el-input-number v-model="courseForm.price" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </el-form-item>

             
            </el-form>

            <el-button v-show="active > 0" style="margin-top: 12px;" @click="pre">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

        </el-card>
  </el-main>  
</template>

<script>
export default {

    data() {
      return {
        active: 0,
        courseForm:{
          title:'',
          subjectId:'',
          lessonNum:0,
          description:'',
          cover:'',
          price:0,
        }

      };
    },

    methods: {
      next() {
        if (this.active == 0){
          this.submitForm()
        }
        
        if (this.active++ > 1) this.active = 0;
      },
      pre(){
        if(this.active > 0)
          this.active--
      },
      submitForm(){
        this.request.post('/edu/course/addCourseInfo',{
          title:this.courseForm.title,
          subjectId:this.courseForm.subjectId,
          lessonNum:this.courseForm.lessonNum,
          description:this.courseForm.description

        }).then(resp=>{
          
        })
      }
    }
}
</script>

<style>

</style>