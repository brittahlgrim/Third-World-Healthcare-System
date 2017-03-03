angular.module('myApp').controller('patientListCtrl', 
	['$scope', '$http', function($scope, $http){
		$scope.users = [
			{
				ID: 1,
				Name: "Susie Han",
				NextVisitDate: "07/12/2016"
			},
			{
				ID: 2,
				Name: "Henry Wong",
				NextVisitDate: "31/01/2017"
			},
			{
				ID: 3,
				Name: "John Cempell",
				NextVisitDate: ""
			},
			{
				ID: 4,
				Name: "Howard Dunn",
				NextVisitDate: "09/04/2017"
			},
			{
				ID: 5,
				Name: "Loki Smith",
				NextVisitDate: "09/09/2017"
			},
			{
				ID: 6,
				Name: "Kyrie Irving",
				NextVisitDate: "16/12/2016"
			},
			{
				ID: 7,
				Name: "George Patton",
				NextVisitDate: "19/05/2017"
			},
			{
				ID: 8,
				Name: "Dan Harmon",
				NextVisitDate: ""
			},
			{
				ID: 9,
				Name: "Rick Sanchez",
				NextVisitDate: "07/12/2016"
			}
		];

		var indexOfHtml = window.location.href.indexOf("/patientList");
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
		$scope.openPatientInformation = function(){
			window.location.href = viewDirectory + "/patientInfo";
		};

		$scope.getNames = function() {
			$http.get("/getNames").success(function (data) {
				$scope.names = data;
			}).error(function() {
				alert("Error in request for getNames()" + error);
			});
		}
		$scope.getNames();
	}]
);