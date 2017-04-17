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

    app.get('/getDefaultNextAppointmentPermutations', isLoggedIn, function(req, res) {
        connection.query('SELECT * from defaultNextAppointmentPermutations', function(err, rows, fields) {
            if (!err)
                console.log("");
//                console.log('The solution is: ', rows);
            else
                console.log('Error while performing Query.');

            res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify(rows);
            res.end(json);
        });
    });
    app.post('/getSchedule', isLoggedIn, function(req, res) {
        var requestDate = req.body.requestDate;
        //TODO: create sql query that uses this date to search the database for appointments
        //TODO: for the time being, use the hardcoded rows variable, once sql is implemented, remove everything below sql connection

//        connection.query('SELECT * from schedule', function(err, rows, fields) {
//            if (!err)
//                console.log('The solution is: ', rows);
//            else
//                console.log('Error while performing Query.');
//
//            res.writeHead(200, {"Content-Type": "application/json"});
//            var json = JSON.stringify(rows);
//            res.end(json);
//        });
        var rows = [
	                    {
	                        ID: 1,
	                        Appointment: {
	                            Type: {
	                                ID: 1,
	                                Name: "Consultation"
	                            },
	                            Date: "2017-04-05"
	                        },
	                        Patient: {
	                            PatientID: 1,
	                            Name: "Jason Todd",
	                              Image: "content/images/Globe.png",
	                              Classification: "Healthy",
	                              RiskFactor: "Medium",
	                              Sex: "Male",
	                              Zone: "4"
	                        }
	                    },
	                    {
	                        ID: 2,
	                        Appointment: {
	                            Type: {
	                                ID: 2,
	                                Name: "Consultation"
	                            },
	                            Date: "2017-04-05"
	                        },
	                        Patient: {
	                            PatientID: 2,
	                            Name: "Mary Lincoln",
	                            Image: "content/images/Globe.png",
	                            Classification: "Critical",
	                            RiskFactor: "High",
	                            Sex: "Female",
	                            Zone: "4"
	                        }
	                    },
	                      {
	                          ID: 3,
	                          Appointment: {
	                              Type: {
	                                  ID: 3,
	                                  Name: "Consultation"
	                              },
	                              Date: "2017-04-05"
	                          },
	                          Patient: {
	                              PatientID: 3,
	                            Name: "Joe Smith",
	                            Image: "content/images/Globe.png",
	                            Classification: "Healthy",
	                            RiskFactor: "Low",
	                            Sex: "Male",
	                            Zone: "4"
	                          }
	                      },
	                      {
	                          ID: 4,
	                          Appointment: {
	                              Type: {
	                                ID: 4,
	                                Name: "Consultation"
	                              },
	                              Date: "2017-04-05"
	                          },
	                          Patient: {
	                              PatientID: 4,
	                              Name: "John Cena",
	                              Image: "content/images/Globe.png",
	                              Classification: "Healthy",
	                              RiskFactor: "Low",
	                              Sex: "Male",
	                              Zone: "4"
	                          }
	                      },
	                      {
	                        ID: 5,
	                        Appointment: {
	                              Type: {
	                                ID: 5,
	                                Name: "Consultation"
	                              },
	                              Date: "2017-04-05"
	                          },
	                        Patient: {
	                            PatientID: 5,
	                            Name: "Jenny Cena",
	                            Image: "content/images/Globe.png",
	                            Classification: "Healthy",
	                            RiskFactor: "Low",
	                            Sex: "Female",
	                            Zone: "3"
	                        }
	                    },
	                    {
	                          ID: 6,
	                          Appointment: {
	                              Type: {
	                                ID: 6,
	                                Name: "Consultation"
	                              },
	                              Date: "2017-04-05"
	                          },
	                          Patient: {
	                              PatientID: 6,
	                            Name: "Addison Henning",
	                            Image: "content/images/Globe.png",
	                            Classification: "Healthy",
	                            RiskFactor: "Low",
	                            Sex: "Female",
	                            Zone: "3"
	                          }
	                      },
	                      {
	                        ID: 7,
	                        Appointment: {
	                              Type: {
	                                ID: 7,
	                                Name: "Consultation"
	                              },
	                              Date: "2017-04-05"
	                          },
	                        Patient: {
	                            PatientID: 7,
	                            Name: "George Hill",
	                            Image: "content/images/Globe.png",
	                            Classification: "Healthy",
	                            RiskFactor: "Low",
	                            Sex: "Male",
	                            Zone: "3"
	                        }
	                    }
	                ];
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify(rows);
        res.end(json);

    });
    app.get('/patientInfo', isLoggedIn, function(req, res) {
        if(req.query.patientID)
            res.sendFile(path.join(__dirname + '/../static/views/patientInfo.html'));
        else
            res.redirect('/patientList');
    });
    app.get('/getNames', isLoggedIn, function(req, res){

		connection.query('SELECT * from PATIENTS', function(err, rows, fields) {
			if (!err)
				console.log("");
//				console.log('The solution is: ', rows);
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
                    if (!err)
                        console.log("");
                        //console.log('The solution is: ', rows);
                    else
                        console.log('Error while performing Query.');

                    res.writeHead(200, {"Content-Type": "application/json"});
                    var json = JSON.stringify(rows[0]);
                    res.end(json);

                });
    		}
    	});
    app.post('/createNewAppointment', isLoggedIn, function(req, res) {
        var newAppointment = JSON.parse(req.body.newAppointment);
        var newAppointmentPatientID = newAppointment.PatientID;
        var newAppointmentTypeID = newAppointment.TypeID;
        var newAppointmentDate = newAppointment.Date;
        //TODO: create sql query inserts new appointment

//		connection.query('DECLARE @PatientID = ' + newAppointmentPatientID + '; ' +
//				'DECLARE @Type = SELECT TOP 1 ID FROM APPOINTMENT_TYPE WHERE ID = ' + newAppointmentTypeID + '; '+
//				'DECLARE @Date = ' + newAppointmentDate + '; ' +
//				'INSERT INTO APPOINTMENTS (PatientID, TypeID, Date) VALUES (@PatientID, @Type, @Date)',
//			function(err, rows, fields)
//			{
//				if(!err)
//					console.log('Rows inserted successfully');
//				else
//					console.log('Error while performing insert');
//
//				res.writeHead(200, {"Content-Type": "application/json"});
//				var json = JSON.stringify(rows);
//				res.end(json);
//			});
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify("Success");
        res.end(json);
    });


	//======================
	//POSTING PATIENTS
	//=====================

var qs = require('querystring');
app.post('/addNewPatient', isLoggedIn, function (req, res) {
		console.log("Post request received!")
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
