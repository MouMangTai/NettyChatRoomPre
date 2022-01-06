<template>
	<div>
		<!--    <el-affix :offset="60" style="z-index: 20;position: fixed;" @click="this.table = !this.table" >-->
		<!--      <el-icon size="30" ><arrow-right-bold /></el-icon>-->
		<!--    </el-affix>-->

		<!--    <el-drawer-->
		<!--        style="z-index: 9999;opacity: 0.5"-->
		<!--        v-model="table"-->
		<!--        title="菜单栏"-->
		<!--        direction="ltr"-->
		<!--        :with-header="false"-->
		<!--        size="240px"-->

		<!--    >-->
		<!--    <el-menu-->
		<!--        style="width: 200px;min-height: calc(100vh - 50px)"-->
		<!--        router-->
		<!--        :default-active="path"-->
		<!--        class="el-menu-vertical-demo"-->
		<!--    >-->


		<!--      <el-menu-item index="/UserManage">-->
		<!--        <span>用户管理</span>-->
		<!--      </el-menu-item>-->

		<!--      <el-menu-item index="/ChatLayout/Friend">-->
		<!--        <span>聊天室</span>-->
		<!--      </el-menu-item>-->

		<!--      <el-menu-item index="/File">-->
		<!--        <span>文件管理</span>-->
		<!--      </el-menu-item>-->

		<!--    </el-menu>-->
		<!--    </el-drawer>-->
	</div>
</template>

<script>
	export default {
		name: "Aside",
		data() {
			return {
				path: '',
				table: false
			}
		},
		created() {
			this.path = this.$route.path; // 设置默认高量的菜单
		}
	}
</script>

<style scoped>

</style>
