<template>
  <div style="width: 100%;height: 100vh; overflow: hidden;background-color: lavender">
    <div style="width: 400px; margin: 150px auto">
      <div style="color: darkorange; font-size: 30px;text-align: center;padding: 30px 0">
        欢迎登陆
      </div>

      <h5 style="text-align: center">未使用的用户名会自动注册</h5>

      <el-form ref="form" :model="form" size="normal">
        <el-form-item>

          <el-input prefix-icon="UserFilled" v-model="form.userName">

          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input prefix-icon="Lock" v-model="form.passWord" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">
            登陆
          </el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>

import request from "@/utils/request";
import {ElNotification} from "element-plus";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {}
    }
  },
  methods: {
    login() {
      request.post("/user/loginAndRegister", this.form)
          .then(res => {
            if (res.success) {
              ElNotification.success({title: 'Success', message: '登陆成功', offset: 50,});
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem("user", JSON.stringify(res.data.user));
              this.$router.push("/");  // 登陆成功跳转
              // 登陆成功后连接websocket
              this.$Websocket.initWebSocket();
            } else {
              ElNotification.error({title: 'Error', message: '登陆失败', offset: 50,});
            }
          })
    }
  }
}
</script>

<style scoped>

</style>