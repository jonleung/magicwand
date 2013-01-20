var socket = io.connect('http://158.130.105.33/'); //TODO Dynamically Load IP

socket.emit('register', { section: 2 });

socket.on('event', function(data) {
  console.log(data);
});
