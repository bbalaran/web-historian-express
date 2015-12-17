var http = require("http");
var express = require("express");
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();




//temporary storage
var sites = {
  'google': {
    queued: false,
    site: 'www.google.com',
    html: ''
  },

  'walmart': {
    queued: false,
    site: 'www.walmart.com',
    html: ''
  }

};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.get('/:sites', function(req, res) {
  if(sites[req.params.sites]){
  res.json(sites[req.params.sites])
  } else {
    res.status(404).send()
  }


});

var port = 3000;
app.listen(port, function() {
  return console.log('listening on http://localhost' + port);
});