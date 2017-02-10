var express = require('express');
var http = require('http');
var https = require('https');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'topeno',
	database	: 'test'
});

var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, '../static')));

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected ... nn");
	} else {
		console.log("Error connecting database ... nn");
	}
});

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

var router = require("../routes/router");
app.use('/', router);
//var routes = require("../routes/routes")(app);


app.listen(8080, function(){
});