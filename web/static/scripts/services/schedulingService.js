angular.module("myApp").factory('SchedulingService', function($http) {
	var patientService = {
		getDefaultNextAppointmentPermutations: function(successCallback, failureCallback){
			return $http.get("/getDefaultNextAppointmentPermutations/").success(function(response){
				successCallback(response);
			}).error(function(){
				failureCallback(null);
			});
		},
		calculateDefaultNextAppointmentDate: function(request, successCallback, failureCallback)
		{
			var defaultPermutations = request.permutations;

			var permutation = _.filter(defaultPermutations, function(perm) {
				return perm.type == request.type
					&& perm.classification == request.classification
					&& perm.riskFactor == request.riskFactor;
			})

			var daysToAdd = 365;
			if(permutation)
				daysToAdd = permutation.daysToAdd;

			return new Date().setDate(someDate.getDate() + daysToAdd);
		},
		getSchedule: function(request, successCallback, failureCallback)
		{
			return $http.get("/getSchedule/:" + request.date).success(function(response){
				successCallback(response);
			}).error(function(){
				failureCallback(null);
			});
		}
	};
    return patientService;
});
