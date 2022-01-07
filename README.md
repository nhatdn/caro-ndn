var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);
let listUser = [];
let checkingFirst = false;
io.on("connection", function(socket) {
    listUser.push(socket.id);
    console.table(listUser);
    io.sockets.emit("Server-send-data", "có gì đâu mà xem");



    
    console.log("NDN:" + socket.id);
    socket.on("Client-send-data", function(data) {
        console.log(socket.id + "vừa gửi data:" + data);
    })
    socket.on("disconnect", function() {
        console.log(socket.id + "da tat");
    })
    /*
        socket.emit // nó gửi lên và nó tự nhận
        socket.broadcast.emit // gửi toàn bộ trừ trả về cho nó
        io.sockets.emit // 1 đứa gửi toàn bộ cả nhóm nhận
        io.to("socket.id của đứa nào đó").emit();
    
    */
});


app.get("/", function(req, res) {
    res.render("trangchu")
})