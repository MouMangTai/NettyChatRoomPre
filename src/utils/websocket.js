import {ElNotification} from "element-plus";

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
/**
 * websocket
 */
export default {
    /**
     * 初始化ws，并进行配置
     */
    initWebSocket() {
        const uri = "ws://127.0.0.1:8114/websocket";
        window.webSocket = new WebSocket(uri);
        window.webSocket.onopen = this.open;
        window.webSocket.onclose = this.close;
        window.webSocket.onerror = this.error;
        window.webSocket.onmessage = this.message;
    },
    open() {
        /*
         * 连接建立发送连接建立消息，使得后端能够将user和channel进行绑定
         */
        window.webSocket.send((JSON.stringify(new Message(null, 0, null, sessionStorage.getItem("user")))));
        /*
         * 设置定时器发送心跳
         * @type {number}
         */
        const timer = setInterval(() => {
            if (window.webSocket.readyState == 1) {
                window.webSocket.send("ping");
            } else {
                clearInterval(timer);
            }
        }, 5000);
    },
    close() {
        console.log("websocket断开连接");
    },
    error(e) {
        console.log("websocket发生异常:"+e);
        window.webSocket.send(JSON.stringify(new Message(null, 6, null, null)));
    },
    message(e){
        let _this = this;
        if (e.data != "pong") {
            let user = JSON.parse(sessionStorage.getItem("user"));
            let m = JSON.parse(e.data);

            if (m.messageType == 1) {   // 收到聊天消息
                let mc = m.messageContent;
                let fromUser = JSON.parse(m.extend);
                ElNotification.success({title: fromUser.userName, message: mc.content});
                window.webSocket.send((JSON.stringify(new Message(null, 3, null, m.messageId))));
            } else if(m.messageType == 5){
                let mc = m.messageContent;
                let fromUser = JSON.parse(m.extend);
                ElNotification.success({title: "频道聊天",message: fromUser.userName+":"+mc.content});
            } else if (m.messageType == 7) {
                let mc = m.messageContent;
                let fromUser = JSON.parse(m.extend);
                ElNotification.success({title: "好友请求",message: fromUser.userName+"向您发起了好友请求"});
                window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));

            } else if (m.messageType == 8) {
                let mc = m.messageContent;
                let fromUser = JSON.parse(m.extend);
                ElNotification.success({title: "好友请求结果", message: fromUser.userName + "同意了您的好友请求"});
                window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));

            } else if (m.messageType == 9) {
                let mc = m.messageContent;
                let fromUser = JSON.parse(m.extend);
                ElNotification.success({title: "好友请求结果", message: fromUser.userName + "拒绝了您的好友请求"});
                window.webSocket.send((JSON.stringify(new Message(null, 10, null, m.messageId))));

            }
        }
    }


}