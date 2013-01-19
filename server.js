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

app.get('/app.js', function (req, res) {
  res.sendfile(__dirname + '/app.js');
});

app.get('/app-interface.js', function (req, res) {
  res.sendfile(__dirname + '/app-interface.js');
});


io.sockets.on('connection', function (socket) {
  socket.on('register', function (data) {
    console.log(data);
  });
  socket.on('degrees', function (data) {
    console.log(data);
  });

});
              



