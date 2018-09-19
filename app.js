var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var SerialPort = require('serialport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Serial port
// the first param is the serial port of your Arduino board
// get by running `ls /dev | grep usb`,
// baudRate corresponds to the baud rate set in your Arduino script

var port = new SerialPort('/dev/tty.usbmodem1421', {
  baudRate: 9600
});

let parser = port.pipe(new SerialPort.parsers.Readline)

port.on('open', () => {
  console.log('Port Opened');
});

parser.on('data', function (data) {
  // console.log('Data:', data);
  // you could create your own events here as things scale or if you have multiple sensors
  io.emit('arduino', data);
});

module.exports = { app: app, server: server }
