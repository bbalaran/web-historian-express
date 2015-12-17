var http = require("http");
var request = require("request");
var redis = require('redis');

var client = redis.createClient()

var sampleSite = {
  'google': {
    queued: false,
    site: 'www.google.com',
    html: ''
  }
};

module.exports.queue = function(key,url) {
  //get from redis at key
  client.get(key, function(err, reply) {
    //if key is undefined
    if (reply === undefined) {
      //create new JSON obj with schema above
      var store = {
          queued: false,
          site: url,
          html: ''
        }
        //set JSON to key in redis
      client.set(reply, store);
    }
  })
  //send html
  return key.html
};

module.exports.process = function(key) {

  // console.log(sampleSite.key.site);

  var storeHtml = function(html) {
    //console.log(html);
    client.set(key.html, JSON.stringify(html))

  }

  request(key.site, function(err, res, body) {
    if (err) {
      throw err;
    } else {
      storeHtml(body);
    }
  })

  // var options = {
  //   host: 'www.google.com',
  //   port: 80,
  //   path: '/',
  //   method: 'GET'
  // };

  // var req = http.request(options, function(res) {
  //   console.log('STATUS: ' + res.statusCode);
  //   console.log('HEADERS: ' + JSON.stringify(res.headers));
  //   res.setEncoding('utf8');
  //   res.on('data', function(chunk) {
  //     console.log('BODY: ' + chunk);
  //   });
  // });

  // req.write('data\n');
  // req.end();

};


module.exports.serve = function(html) {}