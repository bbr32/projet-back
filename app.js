var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tracksRouter = require('./routes/tracks');
var artistsRouter = require('./routes/artists');
var albumsRouter = require('./routes/albums');
var trackRouter = require('./routes/track');
var artistRouter = require('./routes/artist');
var albumRouter = require('./routes/album');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tracks', tracksRouter);
app.use('/track', trackRouter);
app.use('/artists', artistsRouter);
app.use('/artist', artistRouter);
app.use('/albums', albumsRouter);
app.use('/album', albumRouter);

var url = "mongodb://localhost:27017/DBdashboard";

//Connection à la base de données
mongoose.connect(url, {useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
  console.log('Connexion à la base de données résussie');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
