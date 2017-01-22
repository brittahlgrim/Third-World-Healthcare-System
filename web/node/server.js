var express = require('express');
var http = require('http');
var https = require('https');

var app = express();
var path = require('path');
var server = http.createServer(app);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/../views/home.html'));
});

// app.listen = function() {
//   var server = http.createServer(this);
//   return server.listen.apply(server, arguments);
// };

app.listen(8080);