var socket = io();
socket.on("connect",function(){
    console.log("Connected to server");

})
socket.on("disconnect",function (){
    console.log("Disconnected from server");
})
var adjuctScrollPosition = function(){
  var offsetTop = $('.list_message:last-child').offset().top;
  document.getElementById('message_list').scrollTop = 100*offsetTop;
}
var printMessage = function(message, messageType) {
  var formattedTime = moment(message.createdAt).format('hh:mm a');
  var messageText = '';
  if(messageType == 'text'){
      var template = $("#message-template").html();
      messageText = Mustache.render(template,{
        createdAt: message.createdAt,
        from: message.from,
        time: formattedTime,
        text: message.text
      });
  }else if(messageType == 'location'){
      var template = $("#location-message-template").html();
      messageText = Mustache.render(template,{
        createdAt: message.createdAt,
        from: message.from,
        time: formattedTime,
        url: message.url
      });
  }
  $('#message_list').append(messageText);
  adjuctScrollPosition();
}
socket.on("newMessage",function(message){
    printMessage(message,'text');
})
socket.on("newLocationMessage",function(message){
    printMessage(message,'location');
})


$("#message-form").on("submit",function(e){
      e.preventDefault();
      var text = $.trim($("#message").val());
      if(!text) return;
      socket.emit("createMessage",{
          from: 'User',
          text: text
      },function(data){
          $("#message").val('');
      })
});
var handleLocationButton = function(status){
    if(status == 'sending'){
        $("#send-location").text('Sending Location...');
        $("#send-location").attr('disabled', true);
    }else{
        $("#send-location").text('Send Location');
        $("#send-location").removeAttr('disabled');
    }
}
$("#send-location").on("click",function(){
    var buttonEl = $(this);
    if(!navigator.geolocation){
        alert('Geolocation is not supported by your browser');
    }
    handleLocationButton('sending');
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit("createLocationMessage",{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },function(){
          handleLocationButton('sent');
        })
    },function(error){
        handleLocationButton('sent');
    })
})
