var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.use("/static", express.static(__dirname + '/static'));

var PORT = 8080;
server.listen(PORT);
console.log("Listening on port " + PORT);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/computer.html');
});

app.get('/phone', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/app.js', function (req, res) {
  res.sendfile(__dirname + '/app.js');
});

app.get('/app-interface.js', function (req, res) {
  res.sendfile(__dirname + '/app-interface.js');
});


var normalize_angle = function (degrees) {
  if (degrees > 0){
    return degrees;
  }
  else {
    return 360 + degrees;
  }
};

var start_angle, end_angle;

io.sockets.on('connection', function (socket) {
  socket.on('register', function (data) {
    // Client computer registration
    console.log('register');
    console.log(data);
  });
  socket.on('degrees', function (data) {
    console.log('Current rotation = ' + normalize_angle(data.rotation));
  });
  socket.on('calibrate', function(data) {
    // Wand calibration
    console.log('calibrate');
    console.log(data);
    start_angle = data.start_angle;
    end_angle = data.end_angle;
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
              



