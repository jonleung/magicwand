var socket = io.connect('http://158.130.109.229:8080/'); // Dynamically Connect IP

can_post = true;
var post_section = function(section, magnitude, demo) {
  if(can_post){
    socket.emit('section', { 
      section: section,
      magnitude: magnitude,
      demo: demo
    });
    can_post = false;
    setTimeout(function(){
      can_post = true;
    }, 200);
  }
};


var post_calibrate = function (start_angle, end_angle) {
  socket.emit('calibrate', { start_angle: start_angle, end_angle: end_angle });
};
