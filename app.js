// set up NODE_ENV with a default value 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var tabs = require('./routes/tabs');
var products = require('./routes/products');

var app = express();
// set up file name additional extension (compressed or not)
switch (process.env.NODE_ENV) {
    case 'production':
        app.locals.DOT_MIN = '.min';
        break;
    default:
        app.locals.DOT_MIN = '';
        break;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// resource path (installed node modules)
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// local development (don't serve public/tmp in production)
if (process.env.NODE_ENV != 'production') app.use(express.static(path.join(__dirname, 'public', 'tmp')));
// production: serve only images & build/*
app.use(express.static(path.join(__dirname, 'public', 'build')));
// images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
// PDFs
app.use('/pdfs', express.static(path.join(__dirname, 'public', 'pdfs')));

app.use('/', index);
app.use('/users', users);
app.use('/tabs', tabs);
app.use('/products', products);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: 'Page Not Found'
    });
});

module.exports = app;
