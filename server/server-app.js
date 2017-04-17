
require('dotenv').config()
var express = require('express');
var path = require('path');
var url = require('url');
var favicon = require('serve-favicon');
var compression = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash');

var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

// db connection
var connectionString = 'mongodb://'
  + (process.env.DB_USER ? process.env.DB_USER + ':' : '')
  + (process.env.DB_PASS ? process.env.DB_PASS + '@' : '')
  +  process.env.DB_HOST + ':'
  +  process.env.DB_PORT + '/'
  +  process.env.DB_NAME;
mongoose.connect(connectionString);

var app = express();

// TODO: figure out what this does exactly
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, '../server', 'views'));
app.set('view engine', 'ejs');

// TODO: figure out what these do exactly
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client')));
// app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../server', 'public')));
app.use(favicon(path.join(__dirname, '../server', 'public', 'images', 'favicon-16x16.png')));

// TODO: linked in
// const LINKEDIN_API_KEY = "--insert-linkedin-api-key-here--";
// const LINKEDIN_SECRET_KEY = "--insert-linkedin-secret-key-here--";

// routing
app.use('/api', require('./routes/api'));

// just serving the one page now for angular
app.get('/', function(req, res) {
  var urlParts = url.parse(req.url, true);
  res.render('index', { titleStart: 'portfolio', titleEnd: 'NM', redirectUrl: urlParts.query.redirectUrl });
});

// TODO: Make sure this is not catching the errors, or anything else it shouldn't.
// redirect all traffic to our one route above
app.get('*', function(req, res) {
  res.redirect('/?redirectUrl=' + encodeURIComponent(req.url));
});

// TODO: better understand below, and setup server restarter on actual server.
// default error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // if api error return json
  if(url.parse(req.originalUrl).pathname && _.head(url.parse(req.originalUrl).pathname.split('/').filter(String)) === 'api') {
    // TODO: error logging
    res.json({ success: false, message: 'UNCAUGHT EXCEPTION! ' + err.message, error: err });
  }
  else {
    res.render('error');
  }
});

module.exports = app;
