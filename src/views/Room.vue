<template>
  <!--  对话栏布局-->
  <div style="display: flex;margin-top: 20px;height: calc(100vh - 120px)">

    <el-card class="box-card" style="width: 300px">
      <!--      功能区域-->
      <div style="margin-bottom: 20px">
        当前在线用户
      </div>

      <!--      遍历对话框渲染区域-->
      <el-scrollbar height="700px" always ref="scrollbar" max-height="450px">
        <div v-for="user in users" style="height: 80px;display: flex;">

          <div style="width: 50px;">
            <el-avatar
                shape="square"
                :size="50"
                :src="user.avatar"
            />
          </div>

          <div style="width: 150px;">
            {{ user.userName }}
          </div>
          <div style="flex: 1;">
<!--            <el-button @click="add(user)">申请添加好友</el-button>-->
          </div>

        </div>
      </el-scrollbar>




    </el-card>

    <!--右边区域-->
    <el-card class="box-card" style="flex: 1">
      <div class="box-card" style="height: 25px">
        频道聊天
      </div>
      <el-divider content-position="center"/>
      <!--聊天内容-->
      <div style="height: 450px;">
        <el-scrollbar height="450px" always ref="scrollbar" max-height="450px">
          <div v-for="message in messages" style="height: 50px;">
            <div v-if="message.type == 0" style="">
              <el-avatar
                  shape="square"
                  :size="30"
                  :src="message.user.avatar"
              />
              {{ message.content }}
            </div>

            <div v-else style="float: right">

              {{ message.content }}
              <el-avatar
                  shape="square"
                  :size="30"
                  :src="message.user.avatar"
              />
            </div>

          </div>
        </el-scrollbar>
      </div>

      <el-divider content-position="center"/>

      <!--      聊天输入框-->
      <div>

        <el-form :inline="true" label-suffix="：" @submit.native.prevent>
          <el-form-item style="width: 100%">
            <el-input
                type="text"
                v-model="sendMessage"
                show-word-limit
                maxlength="30"
                @keydown.enter.native="send"
                clearable
            />
          </el-form-item>
        </el-form>
      </div>
    </el-card>


  </div>
</template>

<script>
import request from "@/utils/request";
import {ElNotification} from "element-plus";
import {h} from "@vue/runtime-core";

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
  name: "Room",
  data() {
    return {
      users: [],
      ids: [],
      sendMessage: "",
      messages: []
    }
  },
  methods: {
    /**
     * 添加好友
     **/
    add(user){

    },
    /**
     * 加载聊天记录
     */
    loadMessages() {

      let user = JSON.parse(sessionStorage.getItem("user"));
      let userId = -1;
      if (user != null) userId = user.id;

      request.get("all-chat/getAllChatByPage?userId=" + userId + "&PageSize=40").then(res => {
        if (res.success) {
          if (res.data != null) {
            this.messages = res.data;

            console.log(this.messages);
            this.$nextTick(() => {
              this.$refs['scrollbar'].setScrollTop(20000000);
            });
          }
        }
      });
    },
    /**
     * 加载在线用户
     */
    loadOnlineUsers() {
      request.get("user/onlineUsers").then(res => {
        if (res.success) {
          if (res.data != null) {
            this.users = res.data.users;
            this.ids = res.data.ids;
          }
          if (window.webSocket != null && window.webSocket.readyState == 1) {
            window.webSocket.onmessage = this.receiveMessage;
          }
        }
      })
    },
    /**
     * 收到ws消息
     */
    receiveMessage(e) {
      let _this = this;
      if (e.data != "pong") {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let m = JSON.parse(e.data);
        if (m.messageType == 1){
          let mc = m.messageContent;
          let fromUser = JSON.parse(m.extend);
          ElNotification.success({title: fromUser.userName, message: mc.content});
          window.webSocket.send((JSON.stringify(new Message(null, 3, null, m.messageId))));

        } else if (m.messageType == 5) {   // 收到聊天消息
          let mc = m.messageContent;
          let fromUser = JSON.parse(m.extend);
          if (fromUser.id == user.id) {
            _this.addMessage(1, user, mc);
          } else {
            _this.addMessage(0, fromUser, mc);
          }

        } else if (m.messageType == 0 && _this.$route.path == "/ChatLayout/Room") {     // 收到连接消息（即有人上线了）
          let fromUser = JSON.parse(m.extend);
          if (!_this.ids.includes(fromUser.id)) {
            _this.users.push(fromUser);
            _this.ids.push(fromUser.id);
          }
        } else if (m.messageType == 6 && _this.$route.path == "/ChatLayout/Room") {    // 收到断开连接消息
          let userId = m.extend;
          if (_this.ids.includes(Number(userId))) {
            let idx = _this.ids.indexOf(Number(userId));
            _this.ids.splice(idx, 1);
            _this.users.splice(idx, 1);
          }
        } else if (m.messageType == 7) {
          let fromUser = JSON.parse(m.extend);
          ElNotification.success({title: "好友请求",message: fromUser.userName+"向您发起了好友请求"});
          window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));
        } else if (m.messageType == 8) {
          let fromUser = JSON.parse(m.extend);
          ElNotification.success({title: "好友请求", message: fromUser.userName + "同意了您的好友请求"});
          window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));
        }else if (m.messageType == 9) {
          let fromUser = JSON.parse(m.extend);
          ElNotification.success({title: "好友请求", message: fromUser.userName + "拒绝了您的好友请求"});
          window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));
        }
      }
    },
    /**
     * 将收到的聊天记录添加到数组中
     * @param type
     * @param user
     * @param mc
     */
    addMessage(type, user, mc) {
      let newList = {
        type: type,
        user: user,
        content: mc.content
      };
      this.messages.push(newList);

      this.$nextTick(() => {
        this.$refs['scrollbar'].setScrollTop(20000000);
      });
    },
    /**
     * 发送ws消息
     */
    send() {
      if (window.webSocket != null && window.webSocket.readyState == 1) {
        let user = JSON.parse(sessionStorage.getItem("user"));
        window.webSocket.send(JSON.stringify(new Message(null, 5, new MessageContent(user.id, null, this.sendMessage), null)));
      } else {
        ElNotification.error({title: "error", message: '请先登陆', offset: 50});
      }
      this.sendMessage = "";
    }
  },
  created() {
    /*
    延时50ms 使得能让连接完成建立好之后(除了连接之外还需要收发建立连接的消息，后端将其放到map中）再去获取数据
     */
    this.timer = setTimeout(() => {   //设置延迟执行
      this.loadOnlineUsers();
      this.loadMessages();
    }, 100);


  },
  beforeRouteLeave(){
    if(window.webSocket!=null){
      window.webSocket.onmessage = this.$Websocket.message;
    }
  }

}
</script>

<style scoped>
</style>