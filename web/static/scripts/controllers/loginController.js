angular.module('myApp').controller('loginCtrl',
	['$scope', '$http', 'authenticationService', function($scope, $http, authenticationService){
		$scope.username = "";
		$scope.password = "";

		$scope.login = function()
		{
			if(!$scope.username)
				alert("username required");
			else if(!$scope.password)
				alert("password required");

			else
			{
				var request = {
					username: $scope.username,
					password: $scope.password
				};

				var successCallback = function(response)
                {
                    window.location.href = 'home';
                };
                var failureCallback = function(response)
                {
                    alert("Invalid username and/or password");
                }

				authenticationService.login(request, successCallback, failureCallback);
			}

		}
	}]
);