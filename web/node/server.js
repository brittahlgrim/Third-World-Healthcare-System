var express = require('express');
var http = require('http');
var https = require('https');

var app = express();
var path = require('path');
var server = http.createServer(app);
// var webpack = require("webpack");

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/../static/views/home.html'));
});

app.get('/home', function(req, res){
	res.sendFile(path.join(__dirname + '/../static/views/home.html'));
});

app.get('/patientList', function(req, res){
	res.sendFile(path.join(__dirname + '/../static/views/patientList.html'));
});

app.get('/schedule', function(req, res){
	res.sendFile(path.join(__dirname + '/../static/views/schedule.html'));
});

app.get('/patientInfo', function(req, res){
	res.sendFile(path.join(__dirname + '/../static/views/patientInfo.html'));
});


// webpack({
// 	module: {
// 		exports : {
// 			entry: '../scripts/*js',
// 			output: {
// 				filename: 'bundle.js',
// 				path: './dist'
// 			}
// 		}
// 	}
// }, function(err, stats){
// 	console.log(stats);
// 	console.log("something happened");
// });

// app.listen = function() {
//   var server = http.createServer(this);
//   return server.listen.apply(server, arguments);
// };

app.use(express.static(path.join(__dirname, '../static')));

app.listen(8080, function(){
});