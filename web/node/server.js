
var express     = require('express');
var session      = require('express-session');
var cookieParser    = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var app         = express();
var port        = process.env.PORT || 8080;
var mysql       = require('mysql');
var passport    = require('passport');
var flash       = require('connect-flash');

//Force HTTPS
//var secure = require('express-force-https');
//app.use(secure)

//connect to our database
require('../../config/passport')(passport); //pass passport for configuration

var configDB    = require('../../config/database.js');
var connection  = mysql.createConnection(configDB.connection);

console.log("Attempting SQL connection at\nhost: " + configDB.connection.host +
"\nuser: " + configDB.connection.user +
"\npassword: " + configDB.connection.password +
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../static')));
//required for passport
app.use(session({
	secret: 'benbrittdavidjpsydney',
	resave: true,
	saveUnitialized: true
}));//session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
require('../routes/router.js')(app, passport, connection); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
