<template>
	<div style="width: 70px;margin: 20px 0 0 20px;">

		<el-card class="box-card" style="height: 700px">
			<!--      <template #header>-->
			<!--        <div >-->
			<!--          <span>聊天室</span>-->
			<!--        </div>-->
			<!--      </template>-->
			<div style="margin-bottom: 100px">


			</div>
			<!--      <el-icon :size="30" style="margin-bottom: 20px" @click="this.$router.push('/ChatLayout/Dial')">-->
			<!--        <chat-line-round />-->
			<!--      </el-icon>-->

			<el-icon :size="30" style="margin-bottom: 20px" @click="this.$router.push('/ChatLayout/Friend')">
				<user />
			</el-icon>

			<el-icon :size="30" style="margin-bottom: 20px" @click="this.$router.push('/ChatLayout/Room')">
				<chat-square />
			</el-icon>




		</el-card>

	</div>
</template>

<script>
	export default {
		name: "ChatAside"
	}
</script>

<style scoped>

</style>
