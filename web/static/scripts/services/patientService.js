angular.module("myApp").factory("PatientService", [
"$http", function ($http) {
		this.getPatientInfo(patientID, successCallback, failureCallback){
			return $http.get("/getPatientInfo/:" + patientID).success(function (response) {
					successCallback(response);
				}).error(function () {
					failureCallback(null);
				});
		};
	}]
);