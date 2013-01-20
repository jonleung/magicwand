var socket = io.connect('http://158.130.105.33:8080/'); // Dynamically Connect IP

can_post = true;
var post_degrees = function(degrees, magnitude) {
  if(can_post){
    socket.emit('degrees', { 
                              rotation: degrees,
                              magnitude: magnitude
                           });
    can_post = false;
    setTimeout(function(){
      can_post = true;
    }, 100);
  }
};

var post_calibrate = function (start_angle, end_angle) {
  socket.emit('calibrate', { start_angle: start_angle, end_angle: end_angle });
};
