/***
enozom AngularJS App Main Script
***/

/* enozom App */
var enozomApp = angular.module("enozomApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    'app.translation',
    'ngCookies',
    'sharedModule',
    "adaptv.adaptStrap"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
enozomApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
enozomApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
enozomApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
        globalDirection: 'ltr',
        globalLang: 'en'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
enozomApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
enozomApp.controller('HeaderController', ['$scope', '$rootScope', 'UsersFactory', 'initContext', function ($scope, $rootScope, UsersFactory, initContext) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
        UsersFactory.getCurrentUser().success(function (data, status, headers, config) {
            $rootScope.user = data;
        });
    });
    $scope.Logout = initContext.Logout;
    $scope.EditProfile = function () {
        $location.path('profile.html');
    }
}]);

/* Setup Layout Part - Sidebar */
enozomApp.controller('SidebarController', ['$scope', 'RolesFactory', '$rootScope', function ($scope,RolesFactory, $rootScope) {
    $scope.$on('$includeContentLoaded', function () {
        RolesFactory.getRoleSideMenu().success(function (data, status, headers, config) {
            $rootScope.features = data;
        });
        Layout.initSidebar(); // init sidebar

    });
}]);

/* Setup Layout Part - Footer */
enozomApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);



/* Init global settings and run the app */
enozomApp.run(["$rootScope", "settings", "$state", "$translate", "$cookieStore", "$window", "$http", "initContext", function ($rootScope, settings, $state, $translate, $cookieStore, $window, $http, initContext) {
    $rootScope.$state = $state; // state to be accessed from view
    $translate.use(settings.globalLang);
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        // redirect to login page if not logged in    
        $rootScope.checkAccess(event, toState, toParams, fromState, fromParams);
    });
    $rootScope.checkAccess = function (event, toState, toParams, fromState, fromParams) {
        //if not logged in
        if (!$cookieStore.get('key')) {
            // window.location = "login.html";
            $window.location.href = "login.html";

        }
        //if logged in 
        else {
            if (!fromState.abstract) {
                $rootScope.previousState = fromState;
                $rootScope.previousParams = fromParams;
            }
            //if not public page
            if (toState.data.right * 1 !== 0) {
                $http.get(initContext.get().apiBaseURL + 'Roles/CanAccess/' + toState.data.right).
                then(function (response) {
                    bypass = true;
                    if (!response.data) {
                        $location.path('/Denied').replace();

                    }

                });
            }
        }
    }
    $rootScope.getCurrentDateString = function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        };
        var day = d.getDate();
        return year + "-" + month + "-" + day;
    }
    $rootScope.$settings = settings; // state to be accessed from view
}]);