
import config from "./config";
export default {
    ws: null,
    websocket: false,
    conditions: "",
    time: 5000,//发心跳时间
    WebSocketFn: function(fn) { //连接长连接
        // this.ws = new WebSocket(`wss://yl.zckfhly.com/wss?website_domain=${this.website_domains[0]}`);
        console.log("发起websocket连接", config);
 
        this.ws = new WebSocket(config.wsurl);
        this.ws.onopen = () => {
            //连接成功
            console.log("连接成功!");
            this.websocket = true;
 
            store.dispatch("succeed");
            fn && fn(true);
            // this.ws.send('#');
            this.heartbeat();
            let conditions = store.state.Counter.conditions;
            if (!conditions) {return;}
            this.ws.send(typeof conditions == "string" ? conditions : JSON.stringify(conditions));
        };
        this.ws.onerror = () => {
            //连接失败
            console.log("连接失败!");
            this.websocket = false;
            store.dispatch("unsuccessful");
            fn && fn(false);
        };
    },
    // 心跳
    heartbeat: function() {
        console.log("开始发送心跳!");
        let _this = this;
        setInterval(() => {
            console.log(1);
            _this.send(
                {
                    serviceId: 0,
                    commandId: 901,
                    data: { userId: "", contentType: "", content: "", userType: "" },
                },
                false
            );
        }, _this.time);
    },
    onmessage: function(fn) { //获取服务器发送的数据
        if (!this.websocket) {return;}
        this.ws.onmessage = (data) => {
            console.log(data);
            data = data["data"];
            let evalFn = "";
            if (data.indexOf("{") != -1 || data.indexOf("[") != -1) {
                evalFn = eval("(" + data + ")");
            } else {
                evalFn = data;
            }
            fn && fn(evalFn);
        };
    },
    send: function(data, info, fn,) { //发送消息
        console.log(data);
        if (!this.websocket) {
            fn && fn(false);
            return;
        }
        if (info) { //存储能改变长连接属性的信息
            store.dispatch("conditionsActions", data);
        }
        this.ws.send(typeof data == "string" ? data : JSON.stringify(data));
        console.log(typeof data == "string" ? data : JSON.stringify(data));
        fn && fn(true);
    },
    websocketclose(fn) {  //关闭
        if (!this.websocket) {
            fn && fn(false);
            return;
        }
        this.websocket = false;
        store.dispatch("unsuccessful");
        this.ws.close();
        fn && fn(true);
    },
};