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


	$scope.factors = [ 
        {risk:'smoking'},
        {risk:'drugs'},
        {risk:'exposure to chemicals'}
			];


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

	    $scope.delete_patient = function() {
            $http.post("/deletePatient?patientID=" + patientID,{})
        		.success(function(data, status, headers, config){
            		console.log("Patient Deleted Successfully");
            		console.log('data',data);
            		console.log('status',status);
            		console.log('headers',headers);
            		console.log('config',config);
        		}).error(function () {
				console.log("Patient delete failure");
				failureCallback(null);
				});
        };


		$scope.visitTypes = [
			{ ID: 1, Name: "Consultation"},
			{ ID: 2, Name: "Home Visit"}
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
			if(!$scope.newAppointment || !$scope.newAppointment.TypeID)
			{
				$window.alert("Appointment Type required");
				return;
			}
			if(!$scope.newAppointment || !$scope.newAppointment.Date)
			{
				$window.alert("Appointment Date required");
				return;
			}

			var successCallback = function()
			{
				$window.alert("Save successful. Refresh to update appointment schedule.");
				span.onclick();
			}
			var failureCallback = function()
			{
				$window.alert("Save failed. Appointment not saved.");
			}
			var request = {
				PatientID: patientID,
				TypeID: $scope.newAppointment.TypeID,
				Date: $scope.newAppointment.Date
			}
			schedulingService.createNewAppointment(request, successCallback, failureCallback);
		}

		/******scope init********/
		$scope.patient = null;
		$scope.getNames();
		$scope.newAppointment = {
			PatientID: patientID,
			Type: null,
			Date: null
		};

		$(document).ready(function(){
			var href = $window.href
			getPatientInfo();
			Array.from(document.getElementsByClassName("tabcontent")).forEach(function(t){
				t.style.display = "none";});
			$scope.tabClick("Details");
			$( function() {
                $( "#datepicker" ).datepicker($.datepicker.regional['es']);
            } );
		});
	}]
);
