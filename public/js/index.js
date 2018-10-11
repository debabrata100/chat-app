var socket = io();
socket.on("connect",function(){
    console.log("Connected to server");

})
socket.on("disconnect",function (){
    console.log("Disconnected from server");
})
socket.on("newMessage",function(message){
    console.log("New Message",message);
    var li = $('<li> </li>');
    li.text(`${message.from}: ${message.text}`);
    $('#message-list').append(li);
})


$("#message-form").on("submit",function(e){
      e.preventDefault();
      socket.emit("createMessage",{
          from: 'User',
          text: $("#message").val()
      },function(data){
          console.log("data",data);
      })
      $("#message").val('');
})
