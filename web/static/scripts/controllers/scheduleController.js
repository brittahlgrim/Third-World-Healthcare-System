angular.module('myApp').controller('scheduleCtrl', 
	['$scope', '$http', 'schedulingService', function($scope, $http, schedulingService){

		$scope.scheduleDate = null;
		$scope.scheduleDateFormatted = null;
		$scope.previousDate = null;
		$scope.previousDateFormatted = null;
		$scope.nextDate = null;
		$scope.nextDateFormatted = null;

		$scope.openPatientInformation = function(patientID){
			window.location.href = "/patientInfo?patientID=" + patientID;
		};
		$scope.selectedPatient = null;

		var initScheduleListData = function(){
			$scope.changeDate(new Date().toString())
		};
		var  formatDate = function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
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
			console.log(dateToChangeToFormatted);
			$scope.scheduleDate = new Date(dateToChangeToFormatted);
			console.log($scope.scheduleDate);
			$scope.previousDate = new Date(dateToChangeToFormatted);
			$scope.previousDate.setDate($scope.previousDate.getDate() - 1);
			$scope.nextDate = new Date(dateToChangeToFormatted);
			$scope.nextDate.setDate($scope.nextDate.getDate() + 1);

			$scope.scheduleDateFormatted = formatDate($scope.scheduleDate);
            $scope.previousDateFormatted = formatDate($scope.previousDate);
            $scope.nextDateFormatted = formatDate($scope.nextDate);

            var successCallback = function(response){
                console.log(response);
                $scope.schedule = response;
                $scope.schedule.forEach(function(appointment)
                {
					appointment.appointmentDateFormatted = formatDate(appointment.appointmentDate);
                });
            };
            var failureCallback = function(response){
                console.log(response);
            }
            schedulingService.getSchedule($scope.scheduleDateFormatted, successCallback, failureCallback);
		}

		/******scope init********/
		initScheduleListData();
	}]
);