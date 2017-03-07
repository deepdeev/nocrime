// load necessary modules
var express = require('express');
var app = express();
var cors = require('cors')

var path = require('path');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var db;

// app CONFIGURATION
var config = require('./config');//no supe como generar el config :( Sería bueno poner en el readme.md instrucciones de como hacerlo
								// (si, hice npm install --save)

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));
app.use(cors());
// api

// API routes
var apiRoutes= require('./app/api');
app.use('/api', apiRoutes);



app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// Database connection

MongoClient.connect(config.database, function(err, database) {

  if (err) return console.log(err)
  db = database;
	console.log('me conecte bien a la base de datos de no crime');
  module.exports.database = db;

  app.listen(config.port, function(){
    console.log('listening on 1337') //punto y coma
  })
});
//En general bien