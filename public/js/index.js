var socket = io();
socket.on("connect",function(){
    console.log("Connected to server");

})
socket.on("disconnect",function (){
    console.log("Disconnected from server");
})
socket.on("newMessage",function(message){
    // console.log("New Message",message);
    var li = $('<li> </li>');
    li.text(`${message.from}: ${message.text}`);
    $('#message-list').append(li);
})
socket.on("newLocationMessage",function(message){
    // console.log("New Message",message);
    var li = $('<li> </li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    $('#message-list').append(li);
})


$("#message-form").on("submit",function(e){
      e.preventDefault();
      socket.emit("createMessage",{
          from: 'User',
          text: $("#message").val()
      },function(data){
          // console.log("data",data);
      })
      $("#message").val('');
})
$("#send-location").on("click",function(){
    console.log("eee");
    if(!navigator.geolocation){
        alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log("position",position);
        socket.emit("createLocationMessage",{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function(){
        alert("unable to fetch loation");
    })
})
