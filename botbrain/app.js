// Constants

require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var server = require('http').createServer(app);
//var io = require('socket.io')(server);

var direction = require('./routes/direction');
var word = require('./routes/word');

const MONGO_DB = process.env['MONGO_DB']
//const MONGO_PORT = process.env['MONGO_PORT']
const MONGO_HOST = process.env['MONGO_HOST']


var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
console.log(`mongodb://${MONGO_HOST}/${MONGO_DB}`)
mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useUnifiedTopology: true })
        .then(() =>  console.log('connection succesful'))
        .catch((err) => console.error(err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/direction', direction);
app.use('/api/word', word);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
