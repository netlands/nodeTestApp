var express = require('express');
var path = require('path');
var exphbs  = require('express-handlebars'),
  Handlebars = require('handlebars');

var routes = require('./routes/index');

var app = express();

var hbs = exphbs.create({
  defaultLayout: 'main',
  handlebars: Handlebars,
  helpers: {
    safeVal: function (value, safeValue) {
        var out = value || safeValue;
        return new Handlebars.SafeString(out);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: err.status,
		contentLanguage: 'en',
        message: err.message,
        error: err // {}
    });
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});

module.exports = app;
