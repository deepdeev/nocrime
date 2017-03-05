var express = require('express');
var router = express.Router();
var path = require('path');


// I need an instance of db in this file, so I can call it when I need to add something
var server = require('../../server');
var db;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("body  in use is: " + req.body);
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
  db.collection('crimes').save(crime, (save_error, save_result) => {
    if(save_error) return 'Error while saving crime into the database'
    res.send('Crime saved')
  });

});

module.exports = router;
