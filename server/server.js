const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
app.use(express.static(publicPath));

const io = socketIO(server);

io.on('connection',(socket)=>{
    console.log("New user connected");
    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat App!"));
    socket.broadcast.emit("newMessage",generateMessage("Admin", "New user joined"));
    socket.on("createMessage",(message)=>{
        console.log("createMessage",message );
        io.emit("newMessage",generateMessage(message.from,message.text))
    })
    socket.on("disconnect",()=>{
        console.log("User is disconnected");
    })
})

server.listen(port,()=>{
    console.log(`Server is on at ${port}`);
});
