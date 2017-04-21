angular.module("myApp").factory('patientService', function($http) {
	var patientService = {
		getPatientInfo: function(patientID, successCallback, failureCallback){
			return $http.get("/getPatientInfo/:" + patientID).success(function(response){
				successCallback(response);
			}).error(function(){
				failureCallback(null);
			});
		},
		getSelectedPatientID: function() {
			return selectedPatientID;
		},
		setSelectedPatientID: function(selectedID) {
			selectedPatientID = selectID
		}
	};
    return patientService;
});
