angular.module('myApp').controller('patientInfoCtrl', 
	['$scope', '$http', '$window', 'schedulingService', function($scope, $http, $window, schedulingService){
		var urlParam = "patientID=";
		var indexOfHtml = window.location.href.indexOf(urlParam);
		var viewDirectory = window.location.href.substr(0, indexOfHtml);
		var patientID = window.location.href.substr(indexOfHtml + urlParam.length);

		$scope.getNames = function() {
			$http.get("/getNames").success(function (data) {
				$scope.names = data;
			}).error(function() {
				alert("Error in request for getNames()" + error);
			});
		};

        $scope.openPatientList = function(patientID){
            window.location.href = "/patientList";
        };

		var getPatientInfo = function(){
			var successCallback = function(response){
				$scope.patient = response;
			};
			var failureCallback = function(response){
				alert("could not load patient data");
			}
			//TODO: create a patientService and add this http call to that
			$http.get("/getPatientInfo?patientID=" + patientID)
				.success(function (response) {
					$scope.patient = response;
					successCallback(response);
				}).error(function () {
					console.log("failure");
					failureCallback(null);
				});
		};



		var getAppointmentInfo = function(){
			var successCallback = function(response){
				$scope.appointment = response;
				console.log(response);
			};
			var failureCallback = function(response){
				alert("could not load patient data");
			}
			//TODO: create a patientService and add this http call to that
			$http.get("/getAppointmentInfo?patientID=" + patientID)
				.success(function (response) {
					$scope.appointment = response;
					successCallback(response);
				}).error(function () {
					console.log("failure");
					failureCallback(null);
				});
		};


	    $scope.delete_patient = function() {
            $http.post("/deletePatient?patientID=" + patientID,{})
        		.success(function(data, status, headers, config){
            		console.log("Paciente eliminado con éxito");
            		console.log('data',data);
            		console.log('status',status);
            		console.log('headers',headers);
            		console.log('config',config);
        		}).error(function () {
				console.log("Error de eliminación del paciente ");
				failureCallback(null);
				});

            $scope.openPatientList();
        };


		$scope.visitTypes = [
			{ ID: 1, Name: "Consulta"},
			{ ID: 2, Name: "Visita a Casa"}
		];

		$scope.tabClick = function(tabID){
			var tabContent = Array.from(document.getElementsByClassName("tabcontent"));
			tabContent.forEach(function(t){
				t.style.display = "none";
			});

			document.getElementById(tabID).style.display = "block";
		};


		/****REGION: MODAL****/
		// Get the modal
        var modal = document.getElementById('myModal');
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
        }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        /****END REGION: MODAL****/

		$scope.createNewAppointment = function()
		{
			if(!$scope.newAppointment || !$scope.newAppointment.TypeName)
			{
				//$window.alert("Appointment Type required");
				$window.alert("Tipo de cita requerido");
				return;
			}
			if(!$scope.newAppointment || !$scope.newAppointment.Date)
			{
				//$window.alert("Appointment Date required");
				$window.alert("Fecha de cita requerida");
				return;
			}

			var successCallback = function()
			{
				//$window.alert("Save successful. Refresh to update appointment schedule.");
				$window.alert("Se guardo correctamente. Actualizar para actualizar el programa de citas.");
				span.onclick();
			}
			var failureCallback = function()
			{

			//	$window.alert("Save failed. Appointment not saved.");
				$window.alert("Error al guardar. La cita no se guardó.");
			}
			var dateParts = $scope.newAppointment.Date.split("/");
			var request = {
				PatientID: patientID,
				TypeName: $scope.newAppointment.TypeName,
				Date: dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0]
			}
			schedulingService.createNewAppointment(request, successCallback, failureCallback);
		}

		/******scope init********/
		$scope.patient = null;

		$scope.getNames();
		$scope.newAppointment = {
			PatientID: patientID,
			TypeName: null,
			Date: null
		};

		$(document).ready(function(){
			var href = $window.href
			getPatientInfo();
			getAppointmentInfo();
			Array.from(document.getElementsByClassName("tabcontent")).forEach(function(t){
				t.style.display = "none";});
			$scope.tabClick("AppointmentHistory");
			$( function() {
                $( "#datepicker" ).datepicker($.datepicker.regional['es']);
            } );
		});
	}]
);
