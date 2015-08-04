// Node Packages

var express = require('express');
var fs      = require('fs');
var lessCSS = require('less-middleware');

var loggly = require('loggly');

// Variables from project

var routes  = require('./routes/index');
var pizza   = require('./routes/pizza');

var app     = express();

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'awesome_stuff';

app.use(lessCSS('public'));

// app.use(function (req, res, next) {
//   // logging at the top
//   console.log('Request at ' + new Date().toISOString());
//   next();
// });

// Create a Stream

var logStream = fs.createWriteStream('access.log', {flags: 'a'});

// Execute winston

app.use(function (err, req, res, next) {
  var client = require('./lib/loggly')('incoming');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
    err: err
  });
  next();
})

app.use(function(err, req, res, next) {
  var client = require('./lib/loggly')('error');
  client.log({
    ip     : req.ip,
    date   : new Date(),
    url    : req.url,
    status : res.statusCode,
    method : req.method,
    error  : err
  });
  res.status(500).send('[Error message]');
});



app.use(express.static('public'));

app.use('/', routes);
app.use('/pizza', pizza);

app.use(function (req, res) {
  res.status(403).send('Unauthorized!');
});

app.use(function (err, req, res, next) {
  // pass 4 arguments to create an error handling middleware
  console.log('ERRRRRRRRRR', err.stack);
  res.status(500).send('My Bad');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});

