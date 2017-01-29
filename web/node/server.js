var express = require('express');
var http = require('http');
var https = require('https');

var app = express();
var path = require('path');

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

app.use(express.static(path.join(__dirname, '../static')));

app.listen(8080, function(){
});