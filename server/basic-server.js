var http = require("http");
var express = require("express");
var path = require('path');
var morgan = require ('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

app.get('/', function (req, res) {



});

var port = 3000;
app.listen(port, function () {
  return console.log('listening on http://localhost' + port);
});