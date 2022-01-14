<template>
  <div>
    <h1>websocket</h1>
    <el-input v-model="sendMessage" placeholder="请输入内容"></el-input>
    <el-button size="mini" type="primary" @click="send">发送消息</el-button>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="收到的消息"
      v-model="textarea2"
    ></el-input>
    <div>{{testMsg | addZero}}</div>
  </div>
</template>

<script>
export default {
    name: "websocket2",
    data() {
        return {
            path: "ws://192.168.43.50:8082/websocket1",
            socket: "",
            sendMessage: "",
            textarea2: "",
            testMsg: 9,
        };
    },
    mounted() {
    // 初始化
        this.init();
        if (this.socket.readyState != this.socket.OPEN) {
            console.log("连接已中断!");
            //todo...
            this.init();
            return false;
        }
    },
    destroyed() {
    // 销毁监听
        this.socket.onclose = this.close;
    },
    methods: {
        init() {
            if (typeof WebSocket === "undefined") {
                alert("您的浏览器不支持socket");
            } else {
                // 实例化socket
                this.socket = new WebSocket(this.path);
                // 监听socket连接
                this.socket.onopen = this.open;
                // 监听socket错误信息
                this.socket.onerror = this.error;
                // 监听socket消息
                this.socket.onmessage = this.getMessage;
                this.socket.onclose = this.close;
            }
        },
        open() {
            console.log("socket连接成功");
        },
        error() {
            console.log("连接错误");
            this.init();
        },
        getMessage(msg) {
            // 得到服务器返回的数据
            console.log(msg);
            this.textarea2 = msg.data;
        },
        send() {
            console.log("发送消息");
            this.socket.send(this.sendMessage);
        },
        close() {
            console.log("socket已经关闭");
        },
    },
};
</script>
