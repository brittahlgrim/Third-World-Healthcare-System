

// describe('loginCtrl', function() {
//   var loginCtrl;

//   // Before each test load our api.users module
//   beforeEach(angular.mock.module('myApp'));

//   // Before each test set our injected Users factory (_Users_) to our local Users variable
//   beforeEach(inject(function(_loginCtrl_) {
//     loginCtrl = _loginCtrl_;
//   }));

//   // A simple test to verify the Users factory exists
//   it('should exist', function() {
//     expect(loginCtrl).toBeDefined();
//   });
// });

// describe('loginCtrl', function() {
//     var scope, $http, authenticationService, createController;

//     beforeEach(inject(function ($rootScope, $controller, _$http_, _authenticationService_) {
//         $http = _$http_;
//         authenticationService = _authenticationService_;
//         scope = $rootScope.$new();

//         createController = function() {
//             return $controller('loginCtrl', {
//                 '$scope': scope,
//                 '$http':$http,
//                 'authenticationService':authenticationService
//             });
//         };
//     }));

//     it('should have a method to check if the path is active', function() {
//         var controller = createController();
//         $location.path('/about');
//         expect($location.path()).toBe('/about');
//         expect(scope.isActive('/about')).toBe(true);
//         expect(scope.isActive('/contact')).toBe(false);
//     });
// });

describe('loginCtrl', function() {
  beforeEach(module('myApp'));

  var $controller, $scope, $modal, authenticationService;
  var alertMessage = "";

  beforeEach(inject(function(_$controller_, _$rootScope_, _$http_, _$window_, _authenticationService_){
    $scope = _$rootScope_.$new();
    $http = _$http_;
    $window = _$window_;
    authenticationService = _authenticationService_;

    //spyOn(authenticationService, 'login');
    alertMessage = "";
    $window = {
      alert: function(message){
        alertMessage = message;
      },
      location: {
        href: ""
      }
    };
    // spyOn($window, 'alert').and.callFake(function(message){
    //   alertMessage = message;
    // });

    $controller = _$controller_('loginCtrl', { $scope: $scope, $http: $http, $window: $window, authenticationService: authenticationService });
  }));

  describe('login controller', function() {
    it('check initialization', function(){
      expect($scope.username).toBe("");
      expect($scope.password).toBe("");
    });

    describe('scope login', function(){
      it('no username set', function(){
        $scope.username = "";
        $scope.login();
        expect(alertMessage).toBe("username required");

      });

      it('no password set', function(){
        $scope.username = "username";
        $scope.password = "";
        $scope.login();
        expect(alertMessage).toBe("password required");
      });

      it('successful response from server', function(){
        $scope.username = "username";
        $scope.password = "password";

        spyOn(authenticationService, 'login').and.callFake(function(request, successCallback, failureCallback){
          expect(request).toBeDefined();
          expect(request.username).toBe("username");
          expect(request.password).toBe("password");
          successCallback();
        });
        $scope.login();
        expect($window.location.href).toBe("home");
      });

      it('failure response from server', function(){
        $scope.username = "username";
        $scope.password = "password";

        spyOn(authenticationService, 'login').and.callFake(function(request, successCallback, failureCallback){
          expect(request).toBeDefined();
          expect(request.username).toBe("username");
          expect(request.password).toBe("password");
          failureCallback();
        });
        $scope.login();
        expect(alertMessage).toBe("Invalid username and/or password");
      });
    });
  });
});