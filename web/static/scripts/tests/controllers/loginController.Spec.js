describe('loginCtrl', function() {
  beforeEach(module('myApp'));

  var $controller, $scope, $modal, authenticationService;
  var alertMessage = "";

  beforeEach(inject(function(_$controller_, _$rootScope_, _$http_, _$window_, _authenticationService_){
    $scope = _$rootScope_.$new();
    $http = _$http_;
    $window = _$window_;
    authenticationService = _authenticationService_;

    alertMessage = "";
    $window = {
      alert: function(message){
        alertMessage = message;
      },
      location: {
        href: ""
      }
    };

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