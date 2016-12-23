angular.module('myApp').controller('scheduleCtrl', 
	['$scope', '$http', function($scope, $http){
		var indexOfHtml = window.location.href.indexOf("/schedule.html");
		var viewDirectory = window.location.href.substr(0, indexOfHtml);
		$scope.openHome = function(){
			window.location.href = viewDirectory + "/home.html";
		};
		$scope.openPatientList = function(){
			window.location.href = viewDirectory + "/patientList.html";
		};
		$scope.openSchedule = function(){
			window.location.href = viewDirectory + "/schedule.html";
		};
		$scope.openPatientInformation = function(){
			window.location.href = viewDirectory + "/patientInfo.html";
		};

		$scope.selectedPatient = null;

		$scope.schedule = [
			{ PatientID: 1, Time: "3:40 PM", Type: 1},
			{ PatientID: 2, Time: "2:00 PM", Type: 1},
			{ PatientID: 3, Time: "3:00 PM", Type: 1},
			{ PatientID: 4, Time: "3:40 PM", Type: 1},
			{ PatientID: 5, Time: "4:00 PM", Type: 1},
			{ PatientID: 6, Time: "5:00 PM", Type: 1},
			{ PatientID: 7, Time: "6:00 PM", Type: 1}
		];
		var visitTypes = [
			{ ID: 1, Name: "Consultation"}
		];
		var loadedPatientData = [
			{
				ID: 1,
				Name: "Jason Todd",
				Image: "../content/images/Globe.png",
				Classification: "Healthy",
				RiskFactor: "Medium",
				Sex: "Male",
				Zone: "4"
			},
			{
				ID: 2,
				Name: "Mary Lincoln",
				Image: "../content/images/Globe.png",
				Classification: "Critical",
				RiskFactor: "High",
				Sex: "Female",
				Zone: "4"
			},
			{
				ID: 3,
				Name: "Joe Smith",
				Image: "../content/images/Globe.png",
				Classification: "Healthy",
				RiskFactor: "Low",
				Sex: "Male",
				Zone: "4"
			},
			{
				ID: 4,
				Name: "John Cena",
				Image: "../content/images/Globe.png",
				Classification: "Healthy",
				RiskFactor: "Low",
				Sex: "Male",
				Zone: "4"
			},
			{
				ID: 5,
				Name: "Jenny Cena",
				Image: "../content/images/Globe.png",
				Classification: "Healthy",
				RiskFactor: "Low",
				Sex: "Female",
				Zone: "3"
			},
			{
				ID: 6,
				Name: "Addison Henning",
				Image: "../content/images/Globe.png",
				Classification: "Healthy",
				RiskFactor: "Low",
				Sex: "Female",
				Zone: "3"
			},
			{
				ID: 7,
				Name: "George Hill",
				Image: "../content/images/Globe.png",
				Classification: "Healthy",
				RiskFactor: "Low",
				Sex: "Male",
				Zone: "3"
			}
		];

		var initScheduleListData = function(){
			$scope.scheduleDataList = [];
			$scope.schedule.forEach(function(a){
				var patient = _.find(loadedPatientData, function(p){
					return a.PatientID === p.ID;
				});
				var type = _.find(visitTypes, function(t){
					return a.Type === t.ID;
				});
				if(patient){
				var appointment = {
					Patient: patient,
					Time: a.Time,
					Type: type
				};
				if(appointment.Patient)
					$scope.scheduleDataList.push(appointment);
				};
			});
		};

		$scope.showPatientInfo = function(patientID){
			var patient = _.find(loadedPatientData, function(p){
				return p.ID === patientID;
			});
			$scope.selectedPatient = patient;
		};

		$scope.closePatientInfo = function(){
			$scope.selectedPatient = null;
		};

		/******scope init********/
		initScheduleListData();
	}]
);