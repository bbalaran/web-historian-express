var http = require("http");
var express = require("express");
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var redis = require('redis');

var worker = require('../worker/worker.js');

var app = express();
// var client = redis.createClient()





app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({
  extended : true
}))
app.use(bodyParser.json());

//temporary storage
var sites = {
  'google': {
    queued: false,
    site: 'http://www.google.com',
    html: ''
  },

  'walmart': {
    queued: false,
    site: 'www.walmart.com',
    html: ''
  }

};

worker.process(sites.google);

app.param('sites', function (req,res,next,site){
  //if site exists
  if(sites[site]){
    //get the site html
    req.site = sites[site]
    next();
  } else {   
  //else
    res.status(404).sendFile(path.resolve(__dirname, "../client/404notFound.html"));
    //send 404 response and end chain
  }

})

app.get('/:sites', function(req, res) {
    res.json(req.site);
    //if html is ''
      //send robot 
    //else send html
});

var port = 3000;
app.listen(port, function() {
  return console.log('listening on http://localhost' + port);
});