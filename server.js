var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var methodOverride = require('method-override');

require('dotenv').config(); // enables us to read from .env file
require('./config/database');
require('./config/passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/players');
var fightersRouter = require('./routes/fighters');
var championsRouter = require('./routes/champions');
var storeRouter = require('./routes/store');
var eventsRouter = require('./routes/event');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
// app.use(session({... code above
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));  // add this

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fighters', fightersRouter);
app.use('/champions', championsRouter);
app.use('/store', storeRouter);
app.use('/event', eventsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
