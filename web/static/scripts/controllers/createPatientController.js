angular.module('myApp').controller('createPatientCtrl', 
	['$scope', '$http', '$window', function($scope, $http, $window){
		
            $scope.new_patient = {};

            $scope.create_patient = function() {


	            $scope.new_patient.RiskFactor = "Environmental Risks";
	            $scope.new_patient.GroupID = parseInt($scope.new_patient.GroupID, 10);
	           	console.log($scope.new_patient);

                $http.post("/addNewPatient",{'name': $scope.new_patient.Name, 'patientID': $scope.new_patient.DescriptivePatientID, 'familyID': $scope.new_patient.FamilyID, 'ecoName': $scope.new_patient.ECOName, 'zoneID': $scope.new_patient.ZoneID, 'gender': $scope.new_patient.Sex, 'groupID': $scope.new_patient.GroupID, 'riskFactor': $scope.new_patient.RiskFactor, 'chronicIllness': $scope.new_patient.ChronicIllness, 'Notes': $scope.new_patient.Notes})
        			.success(function(data, status, headers, config){
            			console.log("Patient Created Successfully");
            			console.log('data',data);
            			console.log('status',status);
            			console.log('headers',headers);
            			console.log('config',config);
        			}).error(function () {
					console.log("failure");
					failureCallback(null);
					});


            };

	}]
);