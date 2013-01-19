var socket = io.connect('http://158.130.109.229:8080/');

socket.emit('register', { section: 2 });

socket.on('event', function(data) {
  console.log(data);
});
