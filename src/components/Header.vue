<template>
	<div style="height: 70px; line-height: 70px; border-bottom: 1px solid #ccc; display: flex;">
		<!-- 左 -->
		<div style="width: 200px;padding-left: 30px;font-weight: bold; font-size:20px;color: #ff7733">MouMangTai</div>
		<!-- 中 -->
		<div style="flex: 1;">
			<div class="mid">
				<el-link :underline="false" @click="this.$router.push('/Home')">
					首页
				</el-link>
			</div>
			<div class="mid">
				<el-link :underline="false" @click="gotoRoom">
					聊天室
				</el-link>
			</div>
			<div class="mid">
				<el-link :underline="false" href="http://www.moumangtai.com">
					相册
				</el-link>
			</div>

			<!--      <div class="mid">-->
			<!--        <el-link :underline="false" @click="this.$router.push('/UserManage')">-->
			<!--          后台管理-->
			<!--        </el-link>-->
			<!--      </div>-->

		</div>

		<!-- 右 -->
		<div style="width: 100px">
			<!-- 下拉菜单 -->
			<!--      如果已经登陆-->
			<el-dropdown v-if="user!=null">
				<span class="el-dropdown-link">
					{{ user.userName }}
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="person">个人信息</el-dropdown-item>
						<el-dropdown-item @click="logout">退出系统</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>

			<el-link v-if="user==null" :underline="false" @click="this.$router.push('/login')">登陆</el-link>


		</div>

	</div>
</template>

<script>
	import {
		ElNotification
	} from "element-plus";

	class Message {
		constructor(messageId, messageType, messageContent, extend) {
			this.messageId = messageId;
			this.messageType = messageType;
			this.messageContent = messageContent;
			this.extend = extend;
		}
	}

	class MessageContent {
		constructor(fromId, toId, content) {
			this.fromId = fromId;
			this.toId = toId;
			this.content = content;
		}
	}

	export default {
		name: "Header",
		data() {
			return {
				user: {}
			}
		},
		methods: {
			logout() {
				if (window.webSocket != null) {
					window.webSocket.close();
				}

				this.user = null;
				this.$router.push("/Home")
				sessionStorage.clear();
			},
			person() {
				this.$router.push("/Person");
			},
			gotoRoom() {
				let user = JSON.parse(sessionStorage.getItem("user"));
				if (user == null) {
					this.$router.push("/Login");
					ElNotification.error({
						title: "error",
						message: '请先登陆',
						offset: 50
					});
				} else {
					this.$router.push("/ChatLayout/Friend");
				}
			}
		},
		created() {
			this.user = JSON.parse(sessionStorage.getItem("user"));
		}
	}
</script>

<style scoped>
	.mid {
		float: left;
		width: 90px;
		margin: 0 auto;
		text-align: center;
	}
</style>
