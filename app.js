
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

// db connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/portfolio')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// TODO: look into these session settings more closely
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); 
app.use(flash());
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// initialze our custom passport things
require('./passport_').init(app);



/////////////////////////////////////// DEBUG ///////////////////////////////////////////
if (app.get('env') === 'development') {
  app.use(function (req, res, next) {

    //console.log('Remember me cookie ---------------------------> ' + req.cookies.remember_me);

    next();
  });
}
/////////////////////////////////////// DEBUG ///////////////////////////////////////////



// routing
app.use('/',        require('./routes/index'));
app.use('/login',   require('./routes/login'));
app.use('/signup',  require('./routes/signup'));
app.use('/logout',  require('./routes/logout'));
app.use('/account', require('./routes/account'));
// error handler (should be after all other routing)
app.use('/.',       require('./routes/error'));



// default error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
