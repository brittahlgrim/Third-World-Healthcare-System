angular.module('myApp').controller('scheduleCtrl', 
	['$scope', '$http', 'schedulingService', function($scope, $http, schedulingService){

		$scope.scheduleDateFormatted = null;
		$scope.previousDateFormatted = null;
		$scope.nextDateFormatted = null;

		$scope.openPatientInformation = function(patientID){
			window.location.href = "/patientInfo?patientID=" + patientID;
		};
		$scope.selectedPatient = null;

		var initScheduleListData = function(){
			$scope.changeDate(new Date().toString())
		};

		$scope.showPatientInfo = function(appointmentID){
			var appointment = _.find($scope.schedule, function(a){
				return a.ID = appointmentID;
			});
			$scope.selectedPatient = appointment.Patient;
		};

		$scope.closePatientInfo = function(){
			$scope.selectedPatient = null;
		};

		$scope.changeDate = function(dateToChangeToFormatted){
			var scheduleDate = new Date(dateToChangeToFormatted);
			var previousDate = new Date(dateToChangeToFormatted);
			previousDate.setDate(previousDate.getDate() - 1);
			var nextDate = new Date(dateToChangeToFormatted);
			nextDate.setDate(nextDate.getDate() + 1);

			$scope.scheduleDateFormatted = scheduleDate.toString();
            		$scope.previousDateFormatted = previousDate.toString();
            		$scope.nextDateFormatted = nextDate.toString();

            var successCallback = function(response){
                $scope.schedule = response;
            };
            var failureCallback = function(response){
                console.log(response);
            }
            $scope.schedule = schedulingService.getSchedule($scope.scheduleDateFormatted, successCallback, failureCallback);
		}

		/******scope init********/
		initScheduleListData();
	}]
);