var http = require("http");
var request = require ("request");

  var sampleSite = {
    'google': {
      queued: false,
      site: 'www.google.com',
      html: ''
    }
  };


module.exports.process = function(key) {
  
  // console.log(sampleSite.key.site);

  var storeHtml = function (html) {
    console.log(html);
  } 

  request(key.site, function(err,res,body){
    if(err){
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

}

