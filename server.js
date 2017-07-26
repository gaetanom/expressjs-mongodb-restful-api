// 
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(cors());

// Port
var port = process.env.PORT || 8080;

// bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logger
app.use(morgan('dev'));

// router
var apiV1 = require('./routes/api');
app.use('/api', apiV1);
//

// all requests
app.use(function(req, res, next) {
    // do always
    console.log('Always call.');
    //next(); //
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  /* res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; */

  // render error
  res.status(err.status || 500);
  res.json({status: false, message: err.message});
});


// GO
app.listen(port);
console.log('I\'m on port ' + port);