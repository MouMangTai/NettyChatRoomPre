<template>
  <div>
    <!--    功能区域-->
    <div style="margin: 10px 0;float: left" >
      <el-row class="mb-4">
        <el-button @click="addopen">新增</el-button>
        <el-upload
            action="http://localhost:12201/network/fileUpload/1"
            :on-success="uploadSuccess"
        >
          <el-button size="small">导入</el-button>
        </el-upload>
      </el-row>

    </div>
    <div>
      <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
      >
<!--        <el-table-column-->
<!--            prop="id"-->
<!--            label="ID"-->
<!--            sortable-->
<!--        />-->
        <el-table-column
            prop="fileName"
            label="文件名"
        />
<!--        <el-table-column-->
<!--            prop="remark"-->
<!--            label="备注"-->
<!--        />-->

        <el-table-column fixed="right" label="Operations">
          <template #default="scope">
            <el-button size="small" @click="chakanopen(scope.row)">查看
            </el-button>
            <el-button size="small" @click="bianjiopen(scope.row)">编辑
            </el-button>
            <el-popconfirm title="确认删除吗？" @confirm="comfirmdelete(scope.row.id)">
              <template #reference>
                <el-button size="small">删除
                </el-button>
              </template>
            </el-popconfirm>
            <el-button size="small" @click="jiaoyanopen(scope.row.id)">校验
            </el-button>
          </template>

        </el-table-column>
      </el-table>

    </div>




    <el-dialog
        v-model="isjiaoyan"
        title="检验是否成功"
        width="600px"
        :before-close="jiaoyanclose"
    >
    </el-dialog>

    <el-dialog
        v-model="isbianji"
        title="编辑"
        width="600px"
        :before-close="bianjiclose"
    >
      <el-form :model="form">
        <el-form-item label="id">
          <el-input v-model="form.id" style="width: 100%" readonly></el-input>
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="form.fileName" style="width: 100%" readonly></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.remark" style="width: 100%" readonly></el-input>
        </el-form-item>

        <el-form-item label="脚本">
          <el-input type="textarea" v-model="form.script" :rows="10"></el-input>
        </el-form-item>

      </el-form>

      <el-button size="small" @click="edit()">编辑保存</el-button>

    </el-dialog>

    <el-dialog
        v-model="ischakan"
        :title="chakanContent.fileName"
        width="600px"
        :before-close="chakanclose"
    >脚本内容
      <br>
      <el-input type="textarea" v-model="chakanContent.script" readonly :rows="20">
      </el-input>

    </el-dialog>

    <el-dialog
        v-model="isadd"
        title="新增"
        width="600px"
        :before-close="addclose"
    >
      <el-form :model="form">
        <el-form-item label="文件名">
          <el-input v-model="form.fileName" style="width: 100%"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.remark" style="width: 100%"></el-input>
        </el-form-item>

        <el-form-item label="脚本">
          <el-input type="textarea" v-model="form.script" :rows="10"></el-input>
        </el-form-item>

      </el-form>


      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isadd = false">取消</el-button>
          <el-button @click="save"
          >提交</el-button
          >
        </span>
      </template>
    </el-dialog>


  </div>
</template>

<script>
import request from "@/utils/request";
import {ElNotification} from "element-plus";

export default {
  name: "TPJY",
  data() {
    return {
      chakanContent:{},
      form:{},
      tableData:[],
      ischakan:false,
      isbianji:false,
      isjiaoyan:false,
      isadd:false
    }
  },
  methods:{
    uploadSuccess(res){
      if(res.success==1){
        this.init();
      }else{
        ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
      }
    },
    comfirmdelete(id){
      console.log(id)
      request.delete("/network/fileDelete/2/"+id).then(res => {
        console.log(res)
        if (res.success==1) {
          this.init();
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    },
    edit(){
      let params = {
        id:this.form.id,
        fileName:this.form.fileName,
        remark:this.form.remark,
        script:this.form.script
      }
      console.log(params);
      request.post("/network/fileSave/2", params).then(res => {
        if (res.success==1) {
          this.isbianji = false;
          this.init();
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    },
    save(){
      let params = {
        fileName:this.form.fileName,
        remark:this.form.remark,
        script:this.form.script
      }
      console.log(params);
      request.post("/network/fileSave/2", params).then(res => {
        if (res.success==1) {
          this.isadd = false;
          this.init();
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    },
    init(){
      request.get("/network/fileList/2").then(res => {
        if (res.success==1) {
          console.log(res.data);
          this.tableData = res.data;
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    },
    addopen(){
      request.get("/network/initFile/2").then(res => {
        if (res.success==1) {
          this.form.script = res.data;
          this.isadd = true;
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })

    },
    addclose(){
      this.isadd = false;
    },
    // 点击关闭弹窗时
    chakanclose() {
      this.ischakan = false;
    },
    bianjiclose(){
      this.isbianji = false;
    },
    jiaoyanclose(){
      this.isjiaoyan = false;
    },
    chakanopen(row){
      request.get("/network/fileDetail/2/"+row.id).then(res => {
        if (res.success==1) {
          this.chakanContent.id = row.id;
          this.chakanContent.fileName = row.fileName;
          this.chakanContent.script = res.data;
          this.ischakan = true;
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    },
    bianjiopen(row){
      request.get("/network/fileDetail/2/"+row.id).then(res => {
        if (res.success==1) {
          this.form = JSON.parse(JSON.stringify(row));
          this.form.id = row.id;
          this.form.fileName = row.fileName;
          this.form.script = res.data;
          this.isbianji = true;
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    },
    jiaoyanopen(id){
      request.post("/network/check/"+id).then(res => {
        if (res.success==1) {
          this.isjiaoyan = true;
        } else {
          ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
        }
      })
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

</style>