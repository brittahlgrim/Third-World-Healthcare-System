
var express = require('express');
var path = require('path');

module.exports = (function() {
    'use strict';
    var router = express.Router();

    router.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/home.html'));
	});

	router.get('/home', function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/home.html'));
	});

	router.get('/patientList', function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/patientList.html'));
	});

	router.get('/schedule', function(req, res){
		res.sendFile(path.join(__dirname + '/../static/views/schedule.html'));
	});

	//to get a specific patient page, 
	router.get('/patientInfo', function(req, res){
		if(req.query.patientID)
			res.sendFile(path.join(__dirname + '/../static/views/patientInfo.html'));
		else
			res.redirect('/patientList');
	});

	router.get('/getPatientInfo', function(req, res){
		var id = req.query.patientID;
		if(!id){
			return null;
		}
		else{
			console.log("here");
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
	})
    return router;    
})();