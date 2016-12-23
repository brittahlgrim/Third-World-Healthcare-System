angular.module('myApp').controller('patientInfoCtrl', 
	['$scope', '$http', function($scope, $http){
		var indexOfHtml = window.location.href.indexOf("/patientInfo.html");
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

		$scope.patient = {
				ID: 1,
				Name: "Valeria Diaz",
				Image: "../content/images/Globe.png",
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

		var visitTypes = [
			{ ID: 1, Name: "Consultation"},
			{ ID: 2, Name: "Home Visit"}
		];

		$scope.tabClick = function(tabID){
			var tabContent = Array.from(document.getElementsByClassName("tabcontent"));
			tabContent.forEach(function(t){
				t.style.display = "none";
			});

			document.getElementById(tabID).style.display = "block";
		}

		/******scope init********/
		$(document).ready(function(){
			Array.from(document.getElementsByClassName("tabcontent")).forEach(function(t){
				t.style.display = "none";});
			$scope.tabClick("Details");
		});
	}]
);