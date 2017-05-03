angular.module('myApp').controller('patientListCtrl', 
	['$scope', '$http', function($scope, $http){
		
		$scope.openPatientInformation = function(patientID){
			window.location.href = "/patientInfo?patientID=" + patientID;
		};
        $scope.zoneFilters = [];

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
        var numTimesZoneCalled=0
        var numTimesGroupCalled=0
        var numTimesApptCalled=0
        var numTimesRiskCalled=0

        $scope.sortPatientsBy = function(fieldToSortBy){
            if(fieldToSortBy == "name"){
                $scope.filteredNames.sort(function(a,b){
                    var nameA=a.Name.split(/(\s+)/)[2].toLowerCase()
                    var nameB=b.Name.split(/(\s+)/)[2].toLowerCase()
                    if (nameA < nameB)
                        return -1; 
                    if (nameA > nameB)
                        return 1;
                    return 0;});
                //toggle order if button pressed again
                if(numTimesNameCalled++%2===0){$scope.filteredNames.reverse()}}
            if(fieldToSortBy == "zone"){
                $scope.filteredNames.sort(function(a,b){
                    if (a.Zone < b.Zone)
                        return -1; 
                    if (a.Zone > b.Zone)
                        return 1;
                    return 0;});
                if(numTimesZoneCalled++%2===0){$scope.filteredNames.reverse()}}
            if(fieldToSortBy == "group"){
                $scope.filteredNames.sort(function(a,b){
                    if (a.GroupID < b.GroupID)
                        return -1; 
                    if (a.GroupID > b.GroupID)
                        return 1;
                    return 0;});
                if(numTimesGroupCalled++%2===0){$scope.filteredNames.reverse()}}
             if(fieldToSortBy == "appt"){
                $scope.filteredNames.sort(function(a,b){
                    if (a.NextAppointmentDateFormatted < b.NextAppointmentDateFormatted)
                        return -1; 
                    if (a.NextAppointmentDateFormatted > b.NextAppointmentDateFormatted)
                        return 1;
                    return 0;});
                if(numTimesApptCalled++%2===0){$scope.filteredNames.reverse()}}
             if(fieldToSortBy == "risk"){
                $scope.filteredNames.sort(function(a,b){
                    var nameA=a.RiskFactor.toLowerCase()
                    var nameB=b.RiskFactor.toLowerCase()
                    if (nameA < nameB)
                        return -1; 
                    if (nameA > nameB)
                        return 1;
                    return 0;});
                if(numTimesRiskCalled++%2===0){$scope.filteredNames.reverse()}}
        };

        var addToFilters = function (patient)
        {
            if (!$scope.zoneFilters.filter(function(z) { return z.Name == patient.Zone; }).length > 0) {
				var zoneFilter = {
					Name: patient.Zone,
					Selected: false
				};
				$scope.zoneFilters.push(zoneFilter);
            };
        };

		$scope.filterNames = function(){
			$scope.filteredNames = $scope.names.filter(function(n) {
				var selectedZoneFilters = $scope.zoneFilters.filter(function(z){
					return z.Selected;
				});
				return selectedZoneFilters.some(function (z) {
					return z == n.Zone;
				});
            });
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
                    addToFilters(patient);
                });
                $scope.filteredNames = $scope.names;
			}).error(function() {
				alert("Error in request for getNames()" + error);
			});
		}

		/**initialize **/
		$scope.getNames();
	}]
);
