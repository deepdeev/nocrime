var express = require('express');

// create a new Router
var apiRouter = express.Router();


// test route to make sure everything is working
apiRouter.get('/', function(req, res) {
  res.json({
    message: 'Welcome to our API.'
  });
});

// set subroutes on the other files
// ngomez22
// Generalmente los requires van al comienzo del archivo. Podrían guardar el
// require de las otras rutas al comienzo y aquí utlizar la variable para darle
// un poquito más de orden al código
apiRouter.use('/crimes', require('./crimes'));
module.exports = apiRouter;
