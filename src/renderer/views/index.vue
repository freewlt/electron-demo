<template>
  <div class="home">
    <div>发送的消息：<input type="text" v-model="msg" /></div>
    <div>接收的消息：<input type="text" v-model="msg2" /></div>
    <div>
      <button @click="tcpClick">发送</button>
    </div>
  </div>
</template>

<script>
// 引入 net 模块
const net = window.require("net");

export default {
    name: "home",
    data() {
        return {
            client: null,
            HOST: "127.0.0.1",
            PORT: 7899,
            msg: "",
            msg2: "",
        };
    },
    created() {},
    mounted() {
    // console.log(net);
        this.initTcp();
        this.connect(this.PORT, this.HOST);
        this.data();
        this.close();
    // this.tcpClicent(this.PORT,this.HOST,'hellow TCP')
    },
    destroyed() {},
    methods: {
    // 初始化TCP连接
        initTcp() {
            this.client = new net.Socket();
        },
        // 当一个 socket 连接成功建立的时候触发该事件。
        connect(PORT, HOST) {
            this.client.connect(PORT, HOST, () => {
                console.log("连接成功: " + HOST + ":" + PORT);
                // 建立连接后立即向服务器发送数据，服务器将收到这些数据
                this.sendMsgToTcp("hellow TCP,Fuck you!");
            });
        },
        // 当接收到数据的时触发该事件。
        data() {
            this.client.on("data", (data) => {
                console.log("DATA: " + data);
                this.msg2 = data;
                this.destroyTcp();
            });
        },
        // 一旦 socket 完全关闭就发出该事件, 监听连接关闭事件
        close() {
            this.client.on("close", function() {
                console.log("关闭连接");
            });
        },
        // 向服务器发送数据，服务器将收到这些数据
        sendMsgToTcp(msg) {
            this.client.write(msg);
        },
        // 手动关闭连接
        destroyTcp() {
            this.client.destroy();
        },
        tcpClick() {
            console.log(this.msg);
            this.sendMsgToTcp(this.msg);
        },
    },
};
</script>