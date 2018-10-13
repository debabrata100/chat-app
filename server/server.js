const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
app.use(express.static(publicPath));

const io = socketIO(server);
var count = 0;

io.on('connection',(socket)=>{
    console.log("New user connected");
    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat App!"));
    socket.broadcast.emit("newMessage",generateMessage("Admin", "New user joined: "+(++count) ));
    socket.on("createMessage",(message, callback)=>{
        console.log("createMessage",message );
        io.emit("newMessage",generateMessage(message.from,message.text))
        callback("This is from Server")
    })
    socket.on("createLocationMessage",(coords,callback)=>{
        console.log("coords",coords);
        io.emit("newLocationMessage", generateLocationMessage('Admin',coords.latitude,coords.longitude))
    })
    socket.on("disconnect",()=>{
        console.log("User is disconnected");
    })
})

server.listen(port,()=>{
    console.log(`Server is on at ${port}`);
});
