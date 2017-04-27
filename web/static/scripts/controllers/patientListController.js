angular.module('myApp').controller('patientListCtrl', 
	['$scope', '$http', function($scope, $http){
		
		$scope.openPatientInformation = function(patientID){
			window.location.href = "/patientInfo?patientID=" + patientID;
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

        var numTimesNameCalled=0

        $scope.sortPatientsBy = function(fieldToSortBy){
            console.log("Sort button pressed!")
            console.log($scope.names)
            if(fieldToSortBy == "name"){
                $scope.names.sort(nameSorting);
                //toggle order if button pressed again
                if(numTimesNameCalled++%2===0){$scope.names.reverse()}}
                
        };
 
        var nameSorting = function(a,b){
            //split by space, take the last name
            var nameA=a.Name.split(/(\s+)/)[2].toLowerCase()
            var nameB=b.Name.split(/(\s+)/)[2].toLowerCase()
            if (nameA < nameB)
                return -1; 
            if (nameA > nameB)
                return 1;
            return 0;
        };

		$scope.getNames = function() {
			$http.get("/getNames").success(function (data) {
				$scope.names = data;
				Array.from($scope.names).forEach(function (patient) {
                    var date = new Date(patient.AppointmentDate);
                    var daysToAdd = patient.WeeksToAdd * 7;
                    date.setDate(date.getDate() + ((patient.WeeksToAdd) * 7));
                    patient.NextAppointmentDate = date;

                    patient.AppointmentDateFormatted = formatDate(patient.AppointmentDate);
                    patient.NextAppointmentDateFormatted = formatDate(patient.NextAppointmentDate);
                });
			}).error(function() {
				alert("Error in request for getNames()" + error);
			});
		}
		$scope.getNames();
	}]
);
