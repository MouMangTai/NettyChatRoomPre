<template>
  <div>
    <div style="margin: 20px 20px 5px 20px">
      <el-button size="big" @click="$router.push('/Home')" >首页</el-button>
      <el-button size="big" @click="$router.push('/Config')">配置</el-button>
      <el-button size="big" @click="$router.push('/Check')">校验</el-button>
      <el-button size="big" @click="init" type="danger" style="float:right">初始化</el-button>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2">
      </el-col>
      <el-col :span="20">
        <router-view style="margin-right: 20px;"/>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>

  </div>
</template>

<script>
import request from "@/utils/request";
import {ElNotification} from "element-plus";

export default {
  name: "TuopuLayout",
  methods:{
    init(){
      request.post("/network/configInit").then(res => {
        if (res.success==1) {
          ElNotification.success({title: 'Success', message: "成功", offset: 100,});
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    }
  }
}
</script>

<style scoped>

</style>