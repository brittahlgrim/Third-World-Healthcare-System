angular.module("myApp").factory('PatientService', function($http) {
	var patientService = {
		getPatientInfo: function(patientID, successCallback, failureCallback){
			return $http.get("/getPatientInfo/:" + patientID).success(function(response){
				successCallback(response);
			}).error(function(){
				failureCallback(null);
			});
		}
	};
    return patientService;
});