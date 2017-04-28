angular.module('myApp').controller('scheduleCtrl', 
	['$scope', '$http', 'schedulingService', function($scope, $http, schedulingService){

        var numTimesNameCalled = 0
        var numTimesDateCalled = 0
        var numTimesTypeCalled = 0

        $scope.sortPatientsInSchedBy = function(fieldToSortBy){
            console.log("Hello World!")
            console.log($scope.schedule)
            if(fieldToSortBy == "name"){
                $scope.schedule.sort(function(a,b){
                    var nameA=a.patientName.split(/(\s+)/)[2].toLowerCase()
                    var nameB=b.patientName.split(/(\s+)/)[2].toLowerCase()
                    if (nameA < nameB)
                        return -1; 
                    if (nameA > nameB)
                        return 1;
                    return 0;});
                console.log($scope.schedule)
                if(numTimesNameCalled++%2===0){$scope.schedule.reverse()}}
        
            if(fieldToSortBy == "date"){
                $scope.schedule.sort(function(a,b){
                    var nameA=a.appointmentDate
                    var nameB=b.appointmentDate
                    if (nameA < nameB)
                        return -1; 
                    if (nameA > nameB)
                        return 1;
                    return 0;});
                console.log($scope.schedule)
                if(numTimesDateCalled++%2===0){$scope.schedule.reverse()}}

            if(fieldToSortBy == "type"){
                $scope.schedule.sort(function(a,b){
                    var nameA=a.appointmentType.toLowerCase()
                    var nameB=b.appointmentType.toLowerCase()
                    if (nameA < nameB)
                        return -1; 
                    if (nameA > nameB)
                        return 1;
                    return 0;});
                console.log($scope.schedule)
                if(numTimesTypeCalled++%2===0){$scope.schedule.reverse()}}
        }

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
			$scope.scheduleDate = new Date(dateToChangeToFormatted);
			$scope.previousDate = new Date(dateToChangeToFormatted);
			$scope.previousDate.setDate($scope.previousDate.getDate() - 1);
			$scope.nextDate = new Date(dateToChangeToFormatted);
			$scope.nextDate.setDate($scope.nextDate.getDate() + 1);

			$scope.scheduleDateFormatted = formatDate($scope.scheduleDate);
            $scope.previousDateFormatted = formatDate($scope.previousDate);
            $scope.nextDateFormatted = formatDate($scope.nextDate);

            var successCallback = function(response){
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

		/***** DATERANGE PICKER ****/
		$(function() {

            var start = moment().subtract(29, 'days');
            var end = moment();

            function cb(start, end) {
                console.log(start.format('YYYY-MM-DD'));
                console.log(end.format('YYYY-MM-DD'));

                var successCallback = function(response){
                    $scope.schedule = response;
                    $scope.schedule.forEach(function(appointment)
                    {
                        appointment.appointmentDateFormatted = formatDate(appointment.appointmentDate);
                    });
                };
                var failureCallback = function(response){
                    console.log(response);
                }
                var request = {
                    startDate: start.format('YYYY-MM-DD'),
                    endDate: end.format('YYYY-MM-DD')
                };
                schedulingService.getScheduleRange(request, successCallback, failureCallback);

                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }

            $('#reportrange').daterangepicker({
                startDate: start,
                endDate: end,
                "locale": {
                        "format": "YYYY/MM/DD",
                        "separator": " - ",
                        "applyLabel": "Aplicar",
                        "cancelLabel": "Cancelar",
                        "fromLabel": "Desde",
                        "toLabel": "Hasta",
                        "customRangeLabel": "A Medida",
                        "daysOfWeek": [
                            "Do",
                            "Lu",
                            "Ma",
                            "Mi",
                            "Ju",
                            "Vi",
                            "Sa"
                        ],
                        "monthNames": [
                            "enero",
                            "febrero",
                            "marzo",
                            "abril",
                            "mayo",
                            "junio",
                            "julio",
                            "agosot",
                            "septiembre",
                            "octubre",
                            "noviembre",
                            "diciembre"
                        ],
                        "firstDay": 1
                    },
                ranges: {
                   'Hoy': [moment(), moment()],
                   'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   '7 Días Anteriores': [moment().subtract(6, 'days'), moment()],
                   '30 Días Anteriores': [moment().subtract(29, 'days'), moment()],
                   'Este Mes': [moment().startOf('month'), moment().endOf('month')],
                   'Mes Anterior': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);

            cb(start, end);

        });
	}]
);
