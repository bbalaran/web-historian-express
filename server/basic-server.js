var http = require("http");
var express = require("express");
var path = require('path');
var app = express();

app.use(express.static('client'));

app.get('/', function (req, res) {



});

var port = 3000;
app.listen(port, function () {
  return console.log('listening on http://localhost' + port);
});