<template>
<!--  对话栏布局-->
  <div style="display: flex;margin-top: 20px;height: calc(100vh - 120px)">

    <el-card class="box-card" style="width: 300px">
<!--      功能区域-->
      <div style="margin-bottom: 20px;">
        <el-input disabled style="margin-right: 20px;width: 80%"></el-input>
        <el-icon size="20" ><circle-plus /></el-icon>
      </div>

<!--      遍历对话框渲染区域-->
      <div v-for="site in [{},{},{}]" style="height: 80px;display: flex;">

        <div style="width: 50px;">
          <el-avatar
              shape="square"
              :size="50"
              src="https://blogimg-1258617433.cos.ap-nanjing.myqcloud.com/img/IMG_0786.jpg"
          />
        </div>

        <div style="width: 150px;">
          用户名
        </div>
        <div style="flex: 1;">
          时间
        </div>

      </div>



    </el-card>


<!--右边区域-->
    <el-card class="box-card" style="flex: 1">




    </el-card>



  </div>
</template>

<script>
export default {
  name: "DialLayout"
}
</script>

<style scoped>

</style>