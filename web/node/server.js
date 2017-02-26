var express     = require('express');
var session      = require('express-session');
var cookieParser    = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var app         = express();
var port        = process.env.PORT || 8080;

var passport    = require('passport');
var flash       = require('connect-flash');


//connect to our database
require('../../config/passport')(passport); //pass passport for configuration

app.use(express.static(path.join(__dirname, '../static')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
require('../routes/router.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);