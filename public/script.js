var socket = io("http://localhost:3000");
var listItems = document.querySelectorAll(".item");
listItems = [...listItems];

// start game
let core;
socket.on("Start-game", function(data) {
    core = data;
})

socket.on("Server-send-data", function(data) {
    if(core.id == data.userID) {
        listItems[data.pos].innerHTML = core.userSymbol;
    } else {
        listItems[data.pos].innerHTML = core.otherUserSymbol;
    }
})
socket.on("Game-Over", function(data) {
    document.querySelector(".result").innerHTML = data;
})

listItems.forEach((item) => {
    item.addEventListener("mouseover", function() {
        item.classList.add("hover");
    })
    item.addEventListener("mouseleave", function() {
        item.classList.remove("hover");
    })
    item.addEventListener("click", ()=>{
        socket.emit("User-clicked", listItems.indexOf(item));
    })
})