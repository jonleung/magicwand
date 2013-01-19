var socket = io.connect('http://localhost');

var post_degrees = function(degrees) {
  socket.emit('degrees', { rotation: degrees });
}
