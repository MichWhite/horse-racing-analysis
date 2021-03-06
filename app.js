var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var echarts = require('echarts');

var horses = require('./routes/horses');

var routes = require('./routes/index');

var events = require('./routes/events.js');
var races = require('./routes/races.js');
var results = require('./routes/results.js');
var historical = require('./routes/historical.js');
// var admin = require('./routes/admin.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);


app.get("/horses", horses.findAll);
app.get('/horses/:EventId', horses.findEvent);
app.get('/horses/:id', horses.findOne);


app.get('/races', races.findAll);

app.get('/results', results.findAll);

app.get('/historical', historical.findAll);


app.get('/events', events.findAll);
app.get('/events/:id', events.findOne);

// app.get('/admin/products', admin.findAll);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
