var socket = io.connect('http://158.130.111.32:8080/');


can_post = true;
var post_degrees = function(degrees) {
  if(can_post){
    socket.emit('degrees', { rotation: degrees });
    can_post = false;
    setTimeout(function(){
      can_post = true;
    }, 100);
  }
}
