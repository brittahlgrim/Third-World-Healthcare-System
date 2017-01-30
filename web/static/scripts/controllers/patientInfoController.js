angular.module('myApp').controller('patientInfoCtrl', 
	['$scope', '$http', function($scope, $http){
		var indexOfHtml = window.location.href.indexOf("/patientInfo");
		var viewDirectory = window.location.href.substr(0, indexOfHtml);
		$scope.openHome = function(){
			window.location.href = viewDirectory + "/home";
		};
		$scope.openPatientList = function(){
			window.location.href = viewDirectory + "/patientList";
		};
		$scope.openSchedule = function(){
			window.location.href = viewDirectory + "/schedule";
		};

		$scope.patient = null;
		

		var getPatientInfo = function(){
			var successCallback = function(response){
				$scope.patient = response;
			};
			var failureCallback = function(response){
				alert("could not load patient data");
			}
			//todo: remove this from being hardcoded
			var patientID = 4;
			//TODO: create a patientService and add this http call to that
			$http.get("/getPatientInfo?patientID=" + patientID)
				.success(function (response) {
					console.log("success");
					successCallback(response);
				}).error(function () {
					console.log("failure");
					failureCallback(null);
				});
		}
		// $scope.patient = {
		// 		ID: 1,
		// 		Name: "Valeria Diaz",
		// 		Image: "content/images/Globe.png",
		// 		Classification: "Healthy",
		// 		RiskFactor: "Medium",
		// 		Sex: "Female",
		// 		Zone: "4",
		// 		Birthdate: "11/24/1991",
		// 		AppointmentHistory: [
		// 			{
		// 				Date: "06/02/2014",
		// 				Month: 1,
		// 				Year: 2014,
		// 				Age: 23,
		// 				TypeID: 2,
		// 				Prevalence: "Healthy",
		// 				Notes: ""
		// 			},
		// 			{
		// 				Date: "06/02/2014",
		// 				Month: 1,
		// 				Year: 2014,
		// 				Age: 23,
		// 				TypeID: 2,
		// 				Prevalence: "Healthy",
		// 				Notes: ""
		// 			},
		// 			{
		// 				Date: "06/02/2014",
		// 				Month: 1,
		// 				Year: 2014,
		// 				Age: 23,
		// 				TypeID: 2,
		// 				Prevalence: "Healthy",
		// 				Notes: ""
		// 			},

		// 		]
		// 	};

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
			getPatientInfo();
			Array.from(document.getElementsByClassName("tabcontent")).forEach(function(t){
				t.style.display = "none";});
			$scope.tabClick("Details");
		});
	}]
);