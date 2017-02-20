// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');

// load up the user model
//var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport, dbConnection) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		dbConnection.query(findByIdQueryString, id, function(err, rows, fields)
		{
			done(err, user);
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with username
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, username, password, done) {

		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function() {

			// find a user whose username is the same as the forms username
			// we are checking to see if the user trying to login already exists
			dbConnection.query(findByUsernameQueryString, username, function(err, rows, fields)
			{
				if(err)
					return done(err);
				else if (rows > 1){
					return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
					} else {

						// if there is no user with that username
						// create the user
						var newUser = {
							local: {
								username: '',
								password: ''
							}
						};

						var hash = generateHash(password);
						// set the user's local credentials
						newUser.local.username    = username;
						newUser.local.password = hash;

						console.log(username);
						console.log(password);
						dbConnection.query(insertQueryString, username, hash, function(err, rows, fields){
							if(err)
								throw err;
						});
						// save the user
						newUser.save(function(err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}
			});
		});

	}));

// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with username
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, username, password, done) { // callback with username and password from our form
		console.log("here");

		// find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists

		dbConnection.query(findByUsernameQueryString, username, function(err, rows, fields) {
			// if there are any errors, return the error before anything else
			if (err)
				return done(err);

			// if no user is found, return the message
			if (rows < 1)
				return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

			var storedPassword = rows[0].password;
			// if the user is found but the password is wrong
			if (!validPassword(password, storedPassword))
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

			// all is well, return successful user
			return done(null, user);
		});

	}));

};

var generateHash = function(password)
{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
var validPassword = function(password, storedPassword)
{
	return bcrypt.compareSync(password, storedPassword);
}

var findByUsernameQueryString = "SELECT * FROM twhs_test_db.dbo.authentication where username = ?;";
var insertQueryString = "INSERT INTO twhs_test_db.dbo.authentication (username, password) VALUES (?, ?)";
var findByIdQueryString = "SELECT * FROM twhs_test_db.dbo.authentication where ID = ?";
