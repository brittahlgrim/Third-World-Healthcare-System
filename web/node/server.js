var express = require('express');
var http = require('http');
var https = require('https');

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../static')));

var router = require("../routes/router");
app.use('/', router);
//var routes = require("../routes/routes")(app);


app.listen(8080, function(){
});