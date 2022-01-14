
<template>
    <div>
        <div> 
            <input type="text" v-model="msg">
            <button @click='sendMessage'>向8000端口发送数据</button>
            {{backdata}}
            <br/>
            <button @click="disMessage">断开链接</button>
            <button @click="connetMessage">恢复链接</button>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
const socket = io.connect("ws://localhost:3000");

export default{
    name: "socket",
    data:function(){
        return {
            msg:"aaaa",
            backdata:"",
        };
    },
    methods:{
        sendMessage() {
            const _this = this;
            socket.emit("chat", this.msg);
            socket.on("loginmsg",function(data){ //接收连接中的login事件
                _this.backdata = data;
            });
        },
        disMessage() {
            socket.disconnect();
        },
        connetMessage() {
            socket.connect();
        },
    }
     
};
</script>