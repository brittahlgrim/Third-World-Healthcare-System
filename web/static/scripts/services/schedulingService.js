angular.module("myApp").factory('schedulingService', function($http) {
	var schedulingService = {
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
			$http({
                url: 'getSchedule',
                method: "POST",
                data: 'requestDate=' + request,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {
                    successCallback(data);
                }).error(function (data, status, headers, config) {
                    failureCallback(data)
                });
		},
		createNewAppointment: function(request, successCallback, failureCallback)
		{
			console.log(request);
			$http({
                url: 'createNewAppointment',
                method: "POST",
                data: 'newAppointment=' + JSON.stringify(request),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {
                    successCallback(data);
                }).error(function (data, status, headers, config) {
                    failureCallback(data)
                });
		}
		
	};
    return schedulingService;
});
