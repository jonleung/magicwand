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
    // Client computer registration
    console.log('register');
    console.log(data);
  });
  socket.on('degrees', function (data) {
    console.log('Current rotation = ' + data.rotation);
  });
  socket.on('calibrate', function(data) {
    // Wand calibration
    console.log('calibrate');
    console.log(data);
  });
  socket.on('hold', function(data) {
    // Wand hold button
    console.log('hold');
    console.log(data);
  });
  socket.on('click', function(data) {
    // Wand click button
    console.log('click');
    console.log(data);
  });
  
});
              



