var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var PORT = 8080;
server.listen(PORT);
console.log("Listening on port " + PORT);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('register', function (data) {
    console.log(data);
  });
});
              



