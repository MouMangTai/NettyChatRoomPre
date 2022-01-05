<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 200px" clearable></el-input>
      <el-button style="margin-left: 5px" @click="load">查询</el-button>
    </div>

    <!--    表格区域-->
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
    >
      <el-table-column
          prop="id"
          label="ID"
          sortable
      />
      <el-table-column
          prop="userName"
          label="用户名"
      />
      <el-table-column
          prop="nickName"
          label="别名"
      />
      <el-table-column
          label="头像">

        <template #default="scope">

          <el-image
              style="width: 100px;height: 100px"
              :src="scope.row.avatar"
              :preview-src-list="[scope.row.avatar]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column
          prop="sex"
          label="性别"
      />
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-popconfirm title="确认删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="text" size="small">删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页区域-->
    <div style="margin: 10px 0;">
      <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>

      <!--      对话框-->
      <el-dialog
          v-model="dialogVisible"
          :title="title"
          width="400px"
          :before-close="handleClose"
      >
        <!--        表单-->
        <el-form :model="form">
          <el-form-item label="用户名">
            <el-input v-model="form.userName" style="width: 200px"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input v-model="form.passWord" type="password" style="width: 200px"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
                ref="upload"
                action="http://127.0.0.1:8113/file/upload"
                :on-success="uploadSuccess">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 200px"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="0">男</el-radio>
            <el-radio v-model="form.sex" label="1">女</el-radio>
          </el-form-item>

          <el-form-item label="地址">
            <el-input v-model="form.address" type="textarea" style="width: 200px"></el-input>
          </el-form-item>

        </el-form>


        <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save"
          >提交</el-button
          >
        </span>
        </template>


      </el-dialog>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
import {ElNotification} from "element-plus";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      form: {
        id: "",
        passWord: "",
        userName: "",
        avatar: "",
        nickName: "",
        sex: "",
        address: ""
      },
      title: "",
      dialogVisible: false,
      pageSize: 10,
      currentPage: 1,
      total: 20,
      search: '',
      tableData: []
    }
  },
  methods: {
    uploadSuccess(res) {
      if (res.success) {
        this.form.avatar = res.data;
      } else {
        ElNotification.error({title: 'Error', message: '上传发生异常', offset: 100,});
      }
    },
    // 获取用户分页信息并渲染
    load() {
      request.get("/user/findPage", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        if (res.success) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      })
    },
    // 保存用户到数据库
    save() {
      if (this.form.id) {
        // 更新
        request.post("/user/update", this.form).then(res => {
          if (res.success) {
            this.load();
            ElNotification.success({title: 'Success', message: '成功修改', offset: 100,});
            this.dialogVisible = false;
          } else {
            ElNotification.error({title: 'Error', message: '修改失败', offset: 100,});
          }
        });
      } else {
        // 新增
        request.post("/user/save", this.form).then(res => {
          if (res.success) {
            this.load();
            ElNotification.success({title: 'Success', message: '成功添加', offset: 100,});
            this.dialogVisible = false;
          } else {
            ElNotification.error({title: 'Error', message: '添加失败', offset: 100,});
          }
        });
      }
      this.$nextTick(() => {
        this.$refs['upload'].clearFiles();
      });
    },
    // 跳出新增用户弹窗
    add() {
      this.form = {};
      this.title = "新增";
      this.dialogVisible = true;
    },
    // 跳出编辑用户弹窗
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.title = "编辑";
      this.dialogVisible = true;
    },
    // 点击删除键
    handleDelete(id) {
      request.get("/user/delete", {
        params: {
          id: id
        }
      }).then(res => {
        if (res.success) {
          this.load();
          ElNotification.success({title: 'Success', message: '删除成功', offset: 50,});
        } else {
          ElNotification.error({title: 'Error', message: '删除失败', offset: 100,});
        }
      })
    },
    // 分页页数改变时
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    // 当前分页改变时
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    // 点击关闭弹窗时
    handleClose() {
      this.dialogVisible = false;
    }
  },
  created() {
    this.load();
  }
}
</script>
