<template>
	<!--  好友栏布局-->
	<div style="display: flex;margin-top: 20px;height: 700px">
		<el-card class="box-card" style="width: 300px">
			<!--      联系人-->
			<el-collapse v-model="activeNames" @change="handleChange" style="height: 100%;">
				<el-scrollbar always ref="scrollbar" height="700px">
					<el-collapse-item title="好友" name="1">
						<!--遍历好友-->
						<!--            <el-input></el-input>-->
						<div v-for="friend in friends" style="height: 80px;display: flex;cursor:pointer"
							@click="this.curFriend = friend;loadMessages(this.curFriend.id)" class="friend">

							<div style="width: 50px;">
								<el-avatar shape="square" :size="50" :src=friend.avatar />
							</div>

							<div style="flex: 1;">
								{{ friend.userName }}
							</div>

						</div>


					</el-collapse-item>

					<el-collapse-item title="好友请求" name="2">
						<!--遍历添加好友请求-->
						<!--            <el-input></el-input>-->
						<div v-for="request in requests" style="height: 80px;display: flex;cursor:pointer"
							class="friend">

							<div style="width: 50px;">
								<el-avatar shape="square" :size="50" :src=request.user.avatar />
							</div>

							<div style="flex: 1;">
								{{ request.user.userName }}
							</div>

							<div style="flex: 2;">
								<el-button @click="agree(request.messageId,request.user.id)" type="success">同意
								</el-button>

							</div>
							<div style="flex: 3;">
								<el-button @click="refuse(request.messageId,request.user.id)" type="danger">拒绝
								</el-button>

							</div>
						</div>


					</el-collapse-item>


					<el-collapse-item title="添加好友" name="3">
						<!--遍历非好友-->
						<!--            <el-input></el-input>-->
						<div v-for="nonFriend in nonFriends" style="height: 80px;display: flex;cursor:pointer" @click=""
							class="friend">

							<div style="width: 50px;">
								<el-avatar shape="square" :size="50" :src=nonFriend.avatar />
							</div>

							<div style="flex: 1;">
								{{ nonFriend.userName }}
							</div>

							<div style="flex: 2;">
								<el-button @click="addFriend(nonFriend.id)">添加</el-button>

							</div>

						</div>
					</el-collapse-item>
				</el-scrollbar>
			</el-collapse>

		</el-card>


		<el-card class="box-card" style="flex: 1" v-if="curFriend!=null">
			<div class="box-card" style="height: 25px">
				{{ curFriend.userName }}
			</div>
			<el-divider content-position="center" />
			<!--聊天内容-->
			<div style="height: 450px;">
				<el-scrollbar height="450px" always ref="scrollbar" max-height="450px">
					<div v-for="message in messages" style="height: 50px;">
						<div v-if="message.type == 0" style="">
							<el-avatar shape="square" :size="30" :src="message.user.avatar" />
							{{ message.content }}
						</div>

						<div v-else style="float: right">

							{{ message.content }}
							<el-avatar shape="square" :size="30" :src="message.user.avatar" />
						</div>

					</div>
				</el-scrollbar>
			</div>

			<el-divider content-position="center" />

			<!--      聊天输入框-->
			<div>
				<el-form :inline="true" label-suffix="：" @submit.native.prevent>
					<el-form-item style="width: 100%">
						<el-input type="text" v-model="sendMessage" show-word-limit maxlength="30"
							@keydown.enter.native="send(curFriend.id)" clearable />
					</el-form-item>
				</el-form>
			</div>
		</el-card>

		<el-card class="box-card" style="flex: 1" v-else>
			点击好友头像进行聊天
		</el-card>


	</div>
</template>

<script>
	import request from "@/utils/request";
	import {
		ElNotification
	} from "element-plus";
	import {
		h
	} from "@vue/runtime-core";

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
	const delay = (function() {
		let timer = 0
		return function(callback, ms) {
			clearTimeout(timer)
			timer = setTimeout(callback, ms)
		}
	})()
	export default {
		name: "FriendLayout",
		data() {
			return {
				activeNames: ["1","2","3"],
				friendCurrentPage: 0,
				friendPageSize: 10,
				friendSearch: "",
				friends: [],
				nonFriends: [],
				curFriend: null,
				messages: [],
				sendMessage: "",
				dialogArr: null,
				requests: []
			}
		},
		methods: {
			/**
			 * 拒绝好友请求
			 */
			refuse(messageId, toId) {
				delay(() => {
					//执行部分
					let _this = this;
					let user = JSON.parse(sessionStorage.getItem("user"));
					if (user == null || window.webSocket == null) {
						ElNotification.error({
							title: "error",
							message: '请先登陆',
							offset: 50
						});
					} else {
						window.webSocket.send(JSON.stringify(new Message(null, 9, new MessageContent(user.id, toId,
							null), messageId)));
						this.requests.forEach(function(item, index) {
							if (item.user.id == toId) {
								_this.requests.splice(index, 1);
							}
						});
					}
				}, 50)

			},
			/**
			 * 同意好友请求
			 */
			agree(messageId, toId) {
				delay(() => {
					//执行部分
					let _this = this;
					let user = JSON.parse(sessionStorage.getItem("user"));
					if (user == null || window.webSocket == null) {
						ElNotification.error({
							title: "error",
							message: '请先登陆',
							offset: 50
						});
					} else {
						window.webSocket.send(JSON.stringify(new Message(null, 8, new MessageContent(user.id, toId,
							null), messageId)));

						let toUser = null;
						this.nonFriends.forEach(function(item, index) {
							if (item.id == toId) {
								toUser = item.user;
								_this.nonFriends.splice(index, 1);
							}
						});

						this.requests.forEach(function(item, index) {
							if (item.user.id == toId) {
								toUser = item.user;
								_this.requests.splice(index, 1);
							}
						});
						this.friends.push(toUser);

					}
				}, 50)

			},
			/**
			 * 请求添加好友
			 */
			addFriend(nonFriendId) {
				delay(() => {
					//执行部分
					let user = JSON.parse(sessionStorage.getItem("user"));
					if (user == null || window.webSocket == null) {
						ElNotification.error({
							title: "error",
							message: '请先登陆',
							offset: 50
						});
					} else {
						window.webSocket.send(JSON.stringify(new Message(null, 7, new MessageContent(user.id,
							nonFriendId, null), null)));
					}
				}, 50)

			},
			/**
			 * 加载好友聊天记录
			 */
			loadMessages(friendId) {

				let user = JSON.parse(sessionStorage.getItem("user"));
				let userId = -1;
				if (user != null) userId = user.id;

				request.get("chat/getChatByPage?userId=" + userId + "&friendId=" + friendId + "&PageSize=30").then(res => {
					if (res.success) {
						if (res.data != null) {
							this.messages = res.data;
							this.$nextTick(() => {
								this.$refs['scrollbar'].setScrollTop(20000000);
							});
						} else {
							this.messages = [];
						}
					}
				});
			},
			/**
			 * 加载好友列表
			 */
			loadFriends() {
				let user = JSON.parse(sessionStorage.getItem("user"));
				request.get("friend/allFriends", {
					params: {
						currentPage: this.friendCurrentPage,
						pageSize: this.friendPageSize,
						search: this.friendSearch,
						userId: user.id
					}
				}).then(res => {
					if (res.success) {
						this.friends = res.data;
						if (window.webSocket != null && window.webSocket.readyState == 1) {
							window.webSocket.onmessage = this.receiveMessage;
						}
					}
				})
			},
			/**
			 * 加载非好友列表
			 */
			loadNonFriends() {
				let user = JSON.parse(sessionStorage.getItem("user"));
				request.get("friend/allNonFriends", {
					params: {
						currentPage: this.friendCurrentPage,
						pageSize: this.friendPageSize,
						search: this.friendSearch,
						userId: user.id
					}
				}).then(res => {
					if (res.success) {
						this.nonFriends = res.data;
					}
				})
			},
			/**
			 * 加载好友请求
			 */
			loadFriendRequest() {
				let user = JSON.parse(sessionStorage.getItem("user"));
				request.get("request/allFriendRequest", {
					params: {
						currentPage: this.friendCurrentPage,
						pageSize: this.friendPageSize,
						search: this.friendSearch,
						userId: user.id
					}
				}).then(res => {
					if (res.success) {
						this.requests = res.data;
					}
				})
			},
			send(toUserId) {
				if (window.webSocket != null && window.webSocket.readyState == 1) {
					let user = JSON.parse(sessionStorage.getItem("user"));
					this.addMessage(1, user, this.sendMessage);
					window.webSocket.send(JSON.stringify(new Message(null, 1, new MessageContent(user.id, toUserId, this
						.sendMessage), null)));
				} else {
					ElNotification.error({
						title: "error",
						message: '请先登陆',
						offset: 50
					});
				}

				this.sendMessage = "";
			},
			/**
			 * 将收到的聊天记录添加到数组中
			 * @param type
			 * @param user
			 * @param mc
			 */
			addMessage(type, user, content) {
				let newList = {
					type: type,
					user: user,
					content: content
				};
				this.messages.push(newList);

				this.$nextTick(() => {
					this.$refs['scrollbar'].setScrollTop(20000000);
				});
			},
			/**
			 * 收到ws消息
			 */
			receiveMessage(e) {
				let _this = this;
				if (e.data != "pong") {
					let user = JSON.parse(sessionStorage.getItem("user"));
					let m = JSON.parse(e.data);

					if (m.messageType == 1) { // 收到聊天消息
						// alert("收到离线消息")
						let mc = m.messageContent;
						let fromUser = JSON.parse(m.extend);
						if (this.curFriend != null && this.curFriend.id == fromUser.id) {
							if (fromUser.id == user.id) {
								_this.addMessage(1, user, mc.content);
							} else {
								_this.addMessage(0, fromUser, mc.content);
							}
						} else {
							ElNotification.success({
								title: fromUser.userName,
								message: mc.content
							});
						}
						window.webSocket.send((JSON.stringify(new Message(null, 3, null, m.messageId))));
					} else if (m.messageType == 5) {
						let mc = m.messageContent;
						let fromUser = JSON.parse(m.extend);
						ElNotification.success({
							title: "频道聊天",
							message: fromUser.userName + ":" + mc.content
						});
					} else if (m.messageType == 7) {
						let fromUser = JSON.parse(m.extend);
						ElNotification.success({
							title: "好友请求",
							message: fromUser.userName + "向您发起了好友请求"
						});
						window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));
						let request = {
							messageId: m.messageId,
							user: fromUser
						};
						this.requests.push(request);
					} else if (m.messageType == 8) {
						let fromUser = JSON.parse(m.extend);
						ElNotification.success({
							title: "好友请求",
							message: fromUser.userName + "同意了您的好友请求"
						});
						window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));

						this.nonFriends.forEach(function(item, index) {
							if (item.id == fromUser.id) {
								_this.nonFriends.splice(index, 1);
							}
						});
						_this.friends.push(fromUser);

					} else if (m.messageType == 9) {
						let fromUser = JSON.parse(m.extend);
						ElNotification.success({
							title: "好友请求",
							message: fromUser.userName + "拒绝了您的好友请求"
						});
						window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));

					}
				}
			},
			handleChange() {

			}
		},
		created() {
			if (window.webSocket == null || window.webSocket.readyState != 1) {
				this.$Websocket.initWebSocket();
			}
			this.loadFriends();
			this.loadNonFriends();
			this.loadFriendRequest();
		},
		beforeRouteLeave() {
			if (window.webSocket != null) {
				window.webSocket.onmessage = this.$Websocket.message;
			}
		}
	}
</script>

<style scoped>
	.friend:hover {
		background-color: #cccccc;
	}
</style>
