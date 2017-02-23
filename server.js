// load necessary modules
var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var db;

// app CONFIGURATION
var config = require('./config');

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port, () => {
  console.log('listening on 1337')
})

// Database connection
