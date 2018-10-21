const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
app.use(express.static(publicPath));

const io = socketIO(server);
const users = new Users();

io.on('connection',(socket)=>{
    console.log("New user connected");
    socket.on('join',(params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and room are required!");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit("newMessage",generateMessage("Admin","Welcome to the chat App!"));
        socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin", `${params.name} has joined` ));

        callback();
    })
    socket.on("createMessage",(message, callback)=>{
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
          io.to(user.room).emit("newMessage",generateMessage(user.name,message.text))
        }
        callback("This is from Server")
    })
    socket.on("createLocationMessage",(coords,callback)=>{
        let user = users.getUser(socket.id);
        if(user){
          io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
        callback();
    })
    socket.on("disconnect",()=>{
        console.log("User is disconnected");
        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin",`${user.name} has left`));
        }
    })
})

server.listen(port,()=>{
    console.log(`Server is on  ${port}`);
});
