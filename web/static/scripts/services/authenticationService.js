angular.module("myApp").factory('authenticationService', function($http) {
	var authenticationService = {
		login: function(request, successCallback, failureCallback) {

			$http.post('/login', request).then(successCallback, failureCallback);
        }
	};

    return authenticationService;
});