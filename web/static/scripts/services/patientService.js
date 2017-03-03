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
)

	.service('selectPatientService', function() {

		var selectedPatientID = null;

		return {
			getSelectedPatientID: function() {
				return selectedPatientID;
			},
			setSelectedPatientID: function(selectedID) {
				selectedPatientID = selectID
			}
		}

	});