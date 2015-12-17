var http = require("http");
var express = require("express");
var path = require('path');
var app = express();
app.get('/', function (req, res) {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

var port = 3000;
app.listen(port, function () {
  return console.log('listening on http://localhost' + port);
});