angular.module('myApp').controller('patientListCtrl', 
	['$scope', '$http', function($scope, $http){
		
		$scope.openPatientInformation = function(patientID){
			window.location.href = "/patientInfo?patientID=" + patientID;
		};




//Trial function to get risk factors from the mysql table
/*
		$scope.getRiskFactors = function() {
			$http.get("/getRiskFactors").success(function (data) {
				$scope.riskFactors = data;
				console.log($scope.riskFactors);
			}).error(function() {
				alert("Error in request for getRiskFactors()" + error);
			});
		}
		$scope.getRiskFactors();
*/


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
