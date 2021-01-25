var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.collectapi.com",
  "port": null,
  "path": "/gasPrice/otherCountriesGasoline",
  "headers": {
    "content-type": "application/json",
    "authorization": "apikey 44a3OBRBd04iop3l7bB4tL:2w0wvffkVGa7RXJ4WkOsWC"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();