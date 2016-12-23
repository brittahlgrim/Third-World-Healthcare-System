var express = require('express');
var app = express();
var path = require("path");

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/home', function(req, res){
	res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/schedule' function(req, res){
	res.sendFile(path.join(__dirname + 'views/schedule.html'));
});

app.get('/patientList' function(req, res){
	res.sendFile(path.join(__dirname + 'views/patientList.html'));
});