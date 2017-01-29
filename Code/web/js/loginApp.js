/***
Enozom AngularJS App Main Script
***/

/* Enozom App */
var loginApp = angular.module("loginApp", [
    "ui.router",
    "oc.lazyLoad",    
    'app.translation',
    'ngCookies',
    'sharedModule'
]);

loginApp.FactoryError = function (data, status, headers, config) {
    alert(status);
};

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
loginApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);


//AngularJS v1.3.x workaround for old style controller declarition in HTML
loginApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/



/* Setup App Main Controller */
loginApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {

    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/








/* Setup Rounting For All Pages */
loginApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/login.html");

    $stateProvider
        //Login


        // Dashboard
        .state('login', {
            url: "/login.html",
            templateUrl: "login.html",
            data: { pageTitle: 'Admin Dashboard Template' }
        })


    
}]);

/* Init global settings and run the app */
loginApp.run(["$rootScope", "$state", "$translate", '$location', '$cookieStore', '$http', function ($rootScope, $state, $translate, $location, $cookieStore, $http) {
    $rootScope.$state = $state; // state to be accessed from view
    $translate.use('ar');
    //// keep user logged in after page refresh
    //$rootScope.globals = $cookieStore.get('globals') || {};
    //if ($rootScope.globals.currentUser) {
    //    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    //}

    //$rootScope.$on('$locationChangeStart', function (event, next, current) {
    //    // redirect to login page if not logged in
    //    if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
    //        $location.path('/login');
    //    }
    //});
}]);