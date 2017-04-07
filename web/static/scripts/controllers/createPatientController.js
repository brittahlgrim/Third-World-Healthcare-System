angular.module('myApp').controller('patientInfoCtrl', 
	['$scope', '$http', '$window', function($scope, $http, $window){
		
            $scope.new_patient = {};

            $scope.create_patient = function() {


            $scope.new_patient.RiskFactor = "Environmental Risks";
            $scope.new_patient.GroupID = parseInt($scope.new_patient.GroupID, 10);
           	console.log($scope.new_patient);

/*                $http.post("server/insert.php",{'name': $patient.Name})
        			.success(function(data, status, headers, config){
            			console.log("Patient Created Successfully");
        			}).error(function () {
					console.log("failure");
					failureCallback(null);
					});
*/

            };

	}]
);