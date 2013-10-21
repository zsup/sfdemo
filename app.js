
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

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

console.log(app.get('port'));

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
  });

  socket.on('buzzer', function(message) {
    console.log("buzzer");
  });

  socket.on('vibrate', function(message) {
    console.log("vibrate");
  });

  socket.on('message', function(message) {
    console.log(message);
  });
});

