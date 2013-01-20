var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


//io.disable('heartbeats');
io.set('heartbeat timeout', 3000);
io.set('heartbeat interval', 1500);


app.use("/static", express.static(__dirname + '/static'));

app.use("/displays", express.static(__dirname + '/displays'));

var PORT = 8080;
server.listen(PORT);
console.log("Listening on port " + PORT);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/computer.html');
});

app.get('/phone', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/testcomp/:section', function(req, res) {
  var section = req.params.section;
  res.sendfile(__dirname + '/computer' + section + '.html');
});

app.get('/test/:group?', function(req, res) {
  io.sockets.in('all').volatile.emit('event', { test: 'all' });
  var group = req.params.group.toString();
  io.sockets.in(group).volatile.emit('event', { test: group });
  res.end();
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

io.sockets.on('connection', function (client) {
  // Add them to all group
  client.join('all');
  
  client.on('register', function (data) {
    // Client computer registration
    // data = { section: 2 }
    console.log('register');
    console.log(data);
    client.join(data.section);
  });
  
  client.on('degrees', function (data) {
    console.log(data);
  });

  client.on('section', function (data) {
    console.log(data);
    group = data.section;
    io.sockets.in(group).volatile.emit('event', data);
  });
  
  client.on('calibrate', function(data) {
    // Wand calibration
    console.log('calibrate');
    console.log(data);
    start_angle = data.start_angle;
    end_angle = data.end_angle;
  });
  
  client.on('hold', function(data) {
    // Wand hold button
    console.log('hold');
    console.log(data);
  });
  
  client.on('click', function(data) {
    // Wand click button
    console.log('click');
    console.log(data);
  });
  
});
              



