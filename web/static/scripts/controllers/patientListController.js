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

        $scope.sortPatientsBy = function(fieldToSortBy){
            console.log("Sort button pressed!")
            if(fieldToSortBy == "name")
                $scope.names.sort(nameSorting);
       
          /*console.log("This is the new $scope.names =>");
            for(var i=0; i<$scope.names.length; i++){
                console.log($scope.names[i].Name);
            }*/
        };
 
        var nameSorting = function(a,b){
            var nameA=a.Name.toLowerCase(), nameB=b.Name.toLowerCase()
            if (nameA < nameB)
                return -1; 
            if (nameA > nameB)
                return 1;
            return 0;
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
