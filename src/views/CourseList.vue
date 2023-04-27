<template>

    <el-main>
        <el-card class="box-card">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item>
                    <router-link to="/AddCourse">
                        <el-button icon="el-icon-plus" size="medium" type="primary" >添加</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </el-card>

  </el-main>  
   
</template>

<script>
export default {

}
</script>

<style>

</style>