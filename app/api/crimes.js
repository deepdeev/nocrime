var express = require('express');
var router = express.Router();
var path = require('path');


// I need an instance of db in this file, so I can call it when I need to add something
// ngomez22
// No me parece correcto importar todo el servidor aquí solo para obtener
// la base de datos.
// Tal vez podrían crear un módulo aparte para funciones de la base de datos,
// como retornar la conexión.

var server = require('../../server');
var db;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  db = server.database; // got the database from server.js
  next();
  console.log('passes middleware');
});


router.get('/', function(req, res) {
      db.collection('crimes').find().toArray(function(err, result){
      if(err) return 'Error in database'
      res.send(result);
      });

});



router.post('/',  function(req, res){
  var crime = req.body;
  crime.date = new Date(crime.date); // so it is saved not asa string but as a Date object
  db.collection('crimes').save(crime, (save_error, save_result) => {
    if(save_error) return 'Error while saving crime into the database'
    res.send('Crime saved')
  });

});
router.post('/many',  function(req, res){
  var crimes = [];
  crimes=req.body.crimes;
  console.log(crimes);
  crimes.forEach((crime,index)=>{crime.date = new Date(crime.date);db.collection('crimes').save(crime, (save_error, save_result) => {
if(index==crimes.length-1)
{
  if(save_error) return 'Error while saving crimes into the database';
  res.send('Crimes saved');

}

  })});

});

// ngomez22
// Tal vez este método podría ser un GET ?
router.post('/search', function (req, res){
  var search = req.body;
  console.log(search);

  if(Object.getOwnPropertyNames(search).length < 3){
    res.send('You did not provide enough arguments to make a search');
  } else {
    var startDate = new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);
    var selectedCrimes = req.body.selectedCrimes;

    db.collection('crimes').find(
      { date: { $gte: startDate, $lte: endDate },
        type: {$in: selectedCrimes }
      }
    ).toArray(function(err, result) {
      if(err) return 'Error in database';
      console.log("--------result--------")
      console.log(result);
      res.send(result);
    })
  }



});

module.exports = router;
