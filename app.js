
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , request = require('request');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Spark stuff
var key = process.env.SPARK_API_KEY;
var domain = 'https://api.sprk.io/'
var path = 'v1/devices/'
var device = 'sfdemo'

var led = {
  pin: 'D0',
  status: false
}
var buzzer = {
  pin: 'D1',
  status: false
}
var vibrate = {
  pin: 'D2',
  status: false
}

function sparkRequest(device, pin, level) {
  request({
    uri: domain + path + device,
    form: {
      'access_token': key,
      pin: pin,
      level: level
    },
    method: 'POST'
  });
}

function toggle(component) {
  if (component.status) {
    sparkRequest(device, component.pin, 'LOW');
    component.status = !component.status;
  } else {
    sparkRequest(device, component.pin, 'HIGH');
    component.status = !component.status;
  }
}

//setInterval(toggle(led), 1000);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);


// socket.io

io.sockets.on('connection', function(socket) {
  console.log("Connected!");

  socket.on('led', function(message) {
    console.log("LED");
    toggle(led);
  });

  socket.on('buzzer', function(message) {
    console.log("buzzer");
    toggle(buzzer);
  });

  socket.on('vibrate', function(message) {
    console.log("vibrate");
    toggle(vibrate);
  });

  socket.on('message', function(message) {
    console.log(message);
  });
});