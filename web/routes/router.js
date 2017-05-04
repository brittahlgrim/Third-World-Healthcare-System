var path = require('path');
// app/routes.js
module.exports = function(app, passport, connection) {

	var dbconfig = require('../../config/database');
	connection.query('USE ' + dbconfig.database);

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', isLoggedIn, function(req, res) {
		res.sendFile(path.join(__dirname + '/../static/views/home.html'));
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page
		res.sendFile(path.join(__dirname + '/../static/views/login.html'));
	});
	app.get('/sandbox', function(req, res) {

    		// render the page
    		res.sendFile(path.join(__dirname + '/../static/views/sandbox.html'));
    	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}),
		function(req, res) {
			if (req.body.remember) {
			  req.session.cookie.maxAge = 1000 * 60 * 3; //3 hours max limit for being logged in
			} else {
			  req.session.cookie.expires = false;
			}
		res.redirect('/');
	});

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page
		res.sendFile(path.join(__dirname + '/../static/views/signup.html'));
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/home', // redirect to the secure home
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// LOGGED IN SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/home', isLoggedIn, function(req, res) {
		res.sendFile(path.join(__dirname + '/../static/views/home.html'));
	});
	app.get('/patientList', isLoggedIn, function(req, res) {
			res.sendFile(path.join(__dirname + '/../static/views/patientList.html'));
	});
	app.get('/schedule', isLoggedIn, function(req, res) {
			res.sendFile(path.join(__dirname + '/../static/views/schedule.html'));
	});

	app.get('/createPatient', isLoggedIn, function(req, res) {
			res.sendFile(path.join(__dirname + '/../static/views/createPatient.html'));
	});

	app.get('/editPatient', isLoggedIn, function(req, res) {
			res.sendFile(path.join(__dirname + '/../static/views/editPatient.html'));
	});

	app.get('/getDefaultNextAppointmentPermutations', isLoggedIn, function(req, res) {
		connection.query('SELECT * from defaultNextAppointmentPermutations', function(err, rows, fields) {
			if (!err){
			}
			else
				console.log('Error while performing Query.');

			res.writeHead(200, {"Content-Type": "application/json"});
			var json = JSON.stringify(rows);
			res.end(json);
		});
	});

	app.post('/getSchedule', isLoggedIn, function(req, res) {
		var requestDate = req.body.requestDate;

		connection.query('SELECT p.ID as patientID, p.Name as patientName, a.AppointmentID as appointmentID, a.AppointmentDate as appointmentDate, a.AppointmentType as appointmentType from APPOINTMENTS a INNER JOIN PATIENTS p on a.PatientID = p.ID WHERE AppointmentDate like \'%' + req.body.requestDate + '%\';', function(err, rows, fields)
		{
			if(!err){
			}else{
				console.log('Error while performing Query.');
			}
			res.writeHead(200, {"Content-Type": "application/json"});
			var json = JSON.stringify(rows);
			res.end(json);
		});

	});

	app.post('/getScheduleRange', isLoggedIn, function(req, res) {
		var request = JSON.parse(req.body.request);
		var startDate = request.startDate;
		var endDate = request.endDate;

		connection.query('SELECT p.ID as patientID, p.Name as patientName, a.AppointmentID as appointmentID, a.AppointmentDate as appointmentDate, a.AppointmentType as appointmentType from APPOINTMENTS a INNER JOIN PATIENTS p on a.PatientID = p.ID WHERE AppointmentDate BETWEEN \'' + startDate + ' 00:00:00\' and \'' + endDate + ' 23:59:59\';', function(err, rows, fields)
		{
			if(!err){
			}else{
				console.log('Error while performing Query.');
			}
			res.writeHead(200, {"Content-Type": "application/json"});
			var json = JSON.stringify(rows);
			res.end(json);
		});
	});
	app.get('/patientInfo', isLoggedIn, function(req, res) {
		if(req.query.patientID)
			res.sendFile(path.join(__dirname + '/../static/views/patientInfo.html'));
		else
			res.redirect('/patientList');
	});
	app.get('/getNames', isLoggedIn, function(req, res){
		connection.query(
			'SELECT p.ID as ID, p.Name as Name, p.ZoneID as Zone, p.GroupID as GroupID, MAX(a.appointmentDate) as AppointmentDate, MAX(a.appointmentType) as AppointmentType, p.RiskFactor as RiskFactor, CASE WHEN (p.GroupID = 1) THEN 52 WHEN (p.GroupID = 2) THEN 26 WHEN (p.GroupID = 3) THEN CASE WHEN (p.ChronicIllness IS NOT NULL) THEN 17 ELSE 26 END ELSE 17 END AS WeeksToAdd FROM PATIENTS p LEFT JOIN APPOINTMENTS a ON p.ID = a.patientID and a.AppointmentDate <= CURDATE() GROUP BY p.ID;'
			, function(err, rows, fields) {
			if (!err){
			}
			else
				console.log('Error while performing Query.');

			res.writeHead(200, {"Content-Type": "application/json"});
			var json = JSON.stringify(rows);
			res.end(json);

		});

	});
	app.get('/getPatientInfo', isLoggedIn, function(req, res){
			var id = req.query.patientID;
			if(!id){
				return null;
			}
			else{


				connection.query('select * from PATIENTS where id = ?;', [ id ], function(err, rows, fields) {
					if (!err){
					}
					else
						console.log('Error while performing Query.');

					res.writeHead(200, {"Content-Type": "application/json"});
					var json = JSON.stringify(rows[0]);
					res.end(json);

				});
			}
		});
		app.get('/getAppointmentInfo', isLoggedIn, function(req, res){
			var id = req.query.patientID;
			if(!id){
				return null;
			}
			else{


				connection.query('select * from APPOINTMENTS where PatientID = ?;', [ id ], function(err, rows, fields) {
					if (!err){
					}
					else
						console.log('Error while performing Query.');

					res.writeHead(200, {"Content-Type": "application/json"});
					var json = JSON.stringify(rows);
					res.end(json);

				});
			}
		});



	app.post('/createNewAppointment', isLoggedIn, function(req, res) {
		var newAppointment = JSON.parse(req.body.newAppointment);
		var newAppointmentPatientID = newAppointment.PatientID;
		var newAppointmentTypeName = newAppointment.TypeName;
		var newAppointmentDate = newAppointment.Date;

		var query = 'INSERT INTO APPOINTMENTS (PatientID, AppointmentType, AppointmentDate) VALUES (' +
			newAppointmentPatientID + ', \'' + newAppointmentTypeName + '\', \'' + newAppointmentDate + '\');';
		connection.query(
				query,
			function(err, rows, fields)
			{
				if(!err)
					console.log('Rows inserted successfully');
				else
					console.log('Error while performing insert');

				res.writeHead(200, {"Content-Type": "application/json"});
				var json = JSON.stringify(rows);
				res.end(json);
			});
	});


	//======================
	//POSTING PATIENTS
	//=====================

	var qs = require('querystring');
	app.post('/addNewPatient', function (req, res) {
		console.log("Post request received!")
		console.log(req.body.DOB);

		connection.query(
			'INSERT INTO PATIENTS (Name, DOB, DescriptivePatientID, FamilyID, ECOName, ZoneID, Sex, GroupID, RiskFactor, ChronicIllness, Notes)' +
			' VALUES ("'+req.body.name+'", STR_TO_DATE("'+req.body.DOB+'", \'%d-%m-%Y\'), "'+req.body.patientID+'", "'+req.body.familyID+'", "'+req.body.ecoName+'", "'+req.body.zoneID+'", "'+req.body.gender+'", "'+req.body.groupID+'", "'+req.body.riskFactor+'", "'+req.body.chronicIllness+'", "'+req.body.notes+'")',
			function(err, res){
				if(err)
					throw err;
			});

		var jsonString = '';
		req.on('data', function(data) {
			jsonString += data;
			console.log(JSON.parse(jsonString));
		});
		req.on('end', function(){
			console.log(JSON.parse(jsonString));
		});
		res.send(201)
	});

	app.post('/editPatient', function (req, res) {
		console.log("Post request received!")
		console.log(req.body.DOB);
		var id = req.query.patientID;

		connection.query(
			'UPDATE PATIENTS ' +
			'SET Name="'+req.body.name+'", DOB=STR_TO_DATE("'+req.body.DOB+'", \'%d-%m-%Y\'), DescriptivePatientID="'+req.body.patientID+'", FamilyID="'+req.body.familyID+'", ECOName="'+req.body.ecoName+'", ZoneID="'+req.body.zoneID+'", Sex="'+req.body.gender+'", GroupID="'+req.body.groupID+'", RiskFactor="'+req.body.riskFactor+'", ChronicIllness="'+req.body.chronicIllness+'", Notes="'+req.body.notes+'" ' +
			'WHERE ID='+id,
			function(err, res){
				if(err)
					throw err;
			});

		var jsonString = '';
		req.on('data', function(data) {
			jsonString += data;
			console.log(JSON.parse(jsonString));
		});
		req.on('end', function(){
			console.log(JSON.parse(jsonString));
		});
		res.send(201)
	});

	app.post('/deletePatient', function (req, res) {
		console.log("Post request received!")
		var id = req.query.patientID;

		connection.query(
			'DELETE from PATIENTS ' +
			'WHERE ID='+id +
			' limit 1',
			function(err, res){
				if(err)
					throw err;
			});

		var jsonString = '';
		req.on('data', function(data) {
			jsonString += data;
			console.log(JSON.parse(jsonString));
		});
		req.on('end', function(){
			console.log(JSON.parse(jsonString));
		});
		res.send(201)
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
	{
		return next();
	}

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
