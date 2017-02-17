angular.module('myApp').controller('homeCtrl', 
	['$scope', '$http', function($scope, $http){
		var indexOfHtml = window.location.href.indexOf("/home");
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

		$scope.getNames = function() {
			$http.get("/getNames").success(function (data) {
				$scope.names = data;
			}).error(function() {
				alert("Error in request for getNames()" + error);
			});
		}

	}]
);