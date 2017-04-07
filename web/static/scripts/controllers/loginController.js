angular.module('myApp').controller('loginCtrl',
	['$scope', '$http', '$window', 'authenticationService', function($scope, $http, $window, authenticationService){
		$scope.username = "";
		$scope.password = "";

		$scope.login = function()
		{
			if(!$scope.username)
				$window.alert("username required");
			else if(!$scope.password)
				$window.alert("password required");

			else
			{
				var request = {
					username: $scope.username,
					password: $scope.password
				};

				var successCallback = function(response)
                {
                    $window.location.href = 'home';
                };
                var failureCallback = function(response)
                {
                    $window.alert("Invalid username and/or password");
                }

				authenticationService.login(request, successCallback, failureCallback);
			}

		}
	}]
);