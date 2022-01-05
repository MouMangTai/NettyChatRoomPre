<template>
  <div>
    <el-card class="box-card" style="margin-left: auto;margin-right: auto;margin-top: 20px;width: 600px;">
      <el-page-header content="个人基本信息" @back="this.$router.push('/')" />

      <el-form ref="form" :model="form" >
        <el-form-item >
          用户名:<el-input disabled v-model="form.userName"></el-input>
        </el-form-item>

        <el-form-item >
          昵称:<el-input v-model="form.nickName"></el-input>
        </el-form-item>

        <el-form-item >
          密码:<el-input show-password v-model="form.passWord"></el-input>
        </el-form-item>

        <el-form-item >
          头像:
          <el-image style="width: 100px;height: 100px;" :src="form.avatar"/>
          <el-upload
              action="http://152.136.230.44:8113/file/upload"
              :on-success="uploadSuccess">
            <el-button type="primary">点击上传</el-button>
          </el-upload>

        </el-form-item>

        <el-form-item >
          性别:
          <el-radio v-model="form.sex" label='0'>男</el-radio>
          <el-radio v-model="form.sex" label='1'>女</el-radio>
        </el-form-item>

        <el-form-item >
          地址:<el-input v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" @click="update">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import {ElNotification} from "element-plus";

export default {
  name: "Person",
  data(){
    return{
      form: {}
    }
  },
  created() {
    this.form = JSON.parse(sessionStorage.getItem("user"));
  },
  methods:{
    update(){
      request.post("/user/update", this.form).then(res => {
        if (res.success) {
          ElNotification.success({
            title: 'Success',
            message: '成功修改',
            offset: 100,
          });
          sessionStorage.setItem("user",JSON.stringify(res.data));
          this.form = res.data;
        } else {
          ElNotification.error({
            title: 'Error',
            message: '修改失败',
            offset: 100,
          });
        }
      });
    },
    uploadSuccess(res){
      if(res.success){
        this.form.avatar = res.data;
      }else {
        ElNotification.error({
          title: 'Error',
          message: '上传发生异常',
          offset: 100,
        });
      }
    }
  }
}
</script>

<style scoped>

</style>