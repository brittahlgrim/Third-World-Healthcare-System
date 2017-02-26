var express     = require('express');
var app         = express();
var port        = process.env.PORT || 8080;
var mysql       = require('mysql');
var passport    = require('passport');
var flash       = require('connect-flash');

var cookieParser    = require('cookie-parser');
var session      = require('express-session');

var http = require('http');
var https = require('https');

var configDB    = require('../../config/database.js');
var connection  = mysql.createConnection({
    host: configDB.host,
    user: configDB.user,
    password: configDB.password,
    database: configDB.database
});

console.log("Attempting SQL connection at\nhost: " + configDB.host +
"\nuser: " + configDB.user +
"\npassword: " + configDB.password +
"\ndatabase: " + configDB.database);

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected ...");
	} else {
		console.log("***\n***\nError connecting to database:\nError code: "+ err+"\n***\n***");
	}
});

require('../../config/passport')(passport, connection); //pass passport for configuration

app.use(cookieParser());

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


var path = require('path');
app.use(express.static(path.join(__dirname, '../static')));

/*
app.get("/",function(req,res){
	connection.query('SELECT * FROM employees;',
		function(err, rows, fields) {
			connection.end();
			if(!err)
				console.log('The solution is: ', rows);
			else
				console.log('Error while performing Query.');
		});
});
*/


// routes ======================================================================
require('../routes/router.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
