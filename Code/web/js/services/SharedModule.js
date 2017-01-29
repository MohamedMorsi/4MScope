var sharedModule = angular.module('sharedModule', [])
  .service('initContext', function ($rootScope, $window,$cookieStore,$http) {
      var sharedSettings = {
          apiBaseURL: 'http://localhost/WebAPI/api/',
      };
      $window.rootScopes = $window.rootScopes || [];
      $window.rootScopes.push($rootScope);

      if (!!$window.sharedService) {
          return $window.sharedService;
      }

      $window.sharedService = {
          change: function (newSettings) {
              sharedSettings = newSettings;
              angular.forEach($window.rootScopes, function (scope) {
                  if (!scope.$$phase) {
                      scope.$apply();
                  }
              });
          },
          get: function () {
              return sharedSettings;
          },
          Logout: function () {
                  $cookieStore.remove("key");
                  window.location = "login.html";
          }
      }
      return $window.sharedService;
  });