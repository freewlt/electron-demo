const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// const io = require("socket.io")(3000);
app.get("/socket-dist", (req, res) => {
    console.log("sg");
    res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.iio.js")
})

io.on("connection", socket => {
  // either with send()
    socket.send("Hello!");
    socket.on('chat',function(data){ //接收连接中的login事件
        console.log(data);
        io.emit('loginmsg','你发过来的数据是：'+data)  //发送回去 事件名为loginmsg
    })
    // socket.on("disconnect", function () {
    //     // io.disconnectSockets();
    //     io.disconnect();
    //     // io.close();
    // });
});

  
server.listen(3000, () => {
    console.log('listening on *:3000');
});