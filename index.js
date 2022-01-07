var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(process.env.PORT || 3000);
let checkingFirst = false;
let countClicked = 0;
io.on("connection", function(socket) {
    countClicked = 0;
    socket.emit("Start-game", { 
                                id: socket.id, 
                                userSymbol : (checkingFirst ? "<span></span>" : "<p></p>"),
                                otherUserSymbol : (!(checkingFirst) ? "<span></span>" : "<p></p>")
                            });
    checkingFirst = !checkingFirst;
    socket.on("User-clicked", (data) => {
        countClicked++;
        io.sockets.emit("Server-send-data", {pos: data, userID : socket.id});
        console.log(countClicked);
        if(countClicked == 9) {
            countClicked = 0;
            io.sockets.emit("Game-Over", "Game over");
        }
    })

});

app.get("/", function(req, res) {
    res.render("trangchu")
})