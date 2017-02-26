
var express = require('express');
var path = require('path');

module.exports = function(app, passport) {
    'use strict';
    //var router = express.Router();

    /**auth**/
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/../static/views/index.html'));
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.sendFile(path.join(__dirname + '/../static/views/login.html'));
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure home section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.sendFile(path.join(__dirname + '/../static/views/signup.html'));
    });

	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure home page
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        //todo: send user from session to actually log in
        //will this be on req.user?
        res.sendFile(path.join(__dirname + '/../static/views/signup.html'));
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    /**end auth**/

    app.get('/', isLoggedIn, function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/home.html'));
	});
	app.get('/home', isLoggedIn, function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/home.html'));
	});
	app.get('/patientList', isLoggedIn, function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/patientList.html'));
	});
	app.get('/schedule', isLoggedIn, function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/schedule.html'));
	});
	//to get a specific patient page, 
	app.get('/patientInfo', isLoggedIn, function(req, res){
		if(req.query.patientID)
			res.sendFile(path.join(__dirname + '/../static/views/patientInfo.html'));
		else
			res.redirect('/patientList');
	});
	app.get('/getPatientInfo', isLoggedIn, function(req, res){
		var id = req.query.patientID;
		if(!id){
			return null;
		}
		else{
			//var patientInfo = getPatientInfoFromDB(patientID);
			var patientInfo = {
				ID: id,
				Name: "Valeria Diaz",
				Image: "content/images/Globe.png",
				Classification: "Healthy",
				RiskFactor: "Medium",
				Sex: "Female",
				Zone: "4",
				Birthdate: "11/24/1991",
				AppointmentHistory: [
					{
						Date: "06/02/2014",
						Month: 1,
						Year: 2014,
						Age: 23,
						TypeID: 2,
						Prevalence: "Healthy",
						Notes: ""
					},
					{
						Date: "06/02/2014",
						Month: 1,
						Year: 2014,
						Age: 23,
						TypeID: 2,
						Prevalence: "Healthy",
						Notes: ""
					},
					{
						Date: "06/02/2014",
						Month: 1,
						Year: 2014,
						Age: 23,
						TypeID: 2,
						Prevalence: "Healthy",
						Notes: ""
					},

				]
			};

			res.writeHead(200, {"Content-Type": "application/json"});
			var json = JSON.stringify(patientInfo);
			res.end(json);
		}
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
};