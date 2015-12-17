var http = require("http");
var express = require("express");
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var worker = require('../worker/worker.js');

var app = express();




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
    site: 'http://www.walmart.com',
    html: ''
  }

};


//worker processing
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
    if(req.site.html === ''){
      //send robot 
    } else {
    //else send html
      res.json(worker.serve(req.site));
    }

});

var port = 3000;
app.listen(port, function() {
  return console.log('listening on http://localhost' + port);
});