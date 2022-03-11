const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const msginp = document.getElementById("msginput");
const msgcontainer = document.querySelector(".container");

var name = prompt("Enter your name to join");

var audi = new Audio("./ting.mp3");

const append = (message, position) => {
    const msgelem = document.createElement('div');
    msgelem.innerText = message;
    msgelem.classList.add("msg");
    msgelem.classList.add(position);
    msgcontainer.append(msgelem);
    if (position != 'right') {
        audi.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = msginp.value;
    var op = "You: " + msg;
    append(op, 'right');
    socket.emit('send', msg);
    msginp.value = "";
})

socket.emit('new-user-joined', name);

socket.on("user-joined", data => {
    var op = data + " joined the chat";
    append(op, "middle");
});

socket.on('recieve', data => {
    var op = data.name + " : " + data.message;
    append(op, 'left');
});

socket.on('left', data => {
    var op = data + " left the chat";
    append(op, 'middle');
});