/* Setup Rounting For All Pages */
enozomApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'rights', function ($stateProvider, $urlRouterProvider, $httpProvider, rights) {
	    
	    $httpProvider.interceptors.push('sessionInjector');

	    // Redirect any unmatched url
	    $urlRouterProvider.otherwise("/pages/profile");

	    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "views/global/login.html",
            data: { pageTitle: 'Admin Dashboard Template' },
            controller: 'LoginController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/global/LoginController.js'
                        ]
                    }]);
                }]
            }
        })

        .state('pages', {
            url: '/pages',
            abstract: true,
            templateUrl: 'views/global/pages.html',
            controller: 'AppController'
        })

    .state('users', {
        url: "/users",
        templateUrl: "views/security/users.html",
        parent: 'pages',
        data: { pageTitle: 'Users List', right: rights.PUBLIC },
        controller: "UsersListController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/UsersListController.js'
                    ]
                }]);
            }]
        }
    })
    .state('UserAdd', {
        url: "/user",
        templateUrl: "views/security/User.html",
        parent: 'pages',
        data: { pageTitle: 'Add User', right: rights.PUBLIC },
        controller: "UserController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/UserController.js'
                    ]
                }]);
            }]
        }
    })
    .state('UserEdit', {
        url: "/users/:id",
        templateUrl: "views/security/User.html",
        parent: 'pages',
        data: { pageTitle: 'Edit User', right: rights.PUBLIC },
        controller: "UserController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/UserController.js'
                    ]
                }]);
            }]
        }
    })
    .state('roles', {
        url: "/roles",
        templateUrl: "views/security/roles.html",
        parent: 'pages',
        data: { pageTitle: 'Roles List', right: rights.PUBLIC },
        controller: "RolesListController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/RolesListController.js'
                    ]
                }]);
            }]
        }
    })
    .state('RoleAdd', {
        url: "/role",
        templateUrl: "views/security/Role.html",
        parent: 'pages',
        data: { pageTitle: 'Add Role', right: rights.PUBLIC },
        controller: "RoleController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/RoleController.js'
                    ]
                }]);
            }]
        }
    })
    .state('RoleEdit', {
        url: "/roles/:id",
        templateUrl: "views/security/Role.html",
        parent: 'pages',
        data: { pageTitle: 'Edit Role', right: rights.ROLES },
        controller: "RoleController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/RoleController.js',
                        'js/factories/security/RolesFactory.js'
                    ]
                }]);
            }]
        }
    })

        .state('denied', {
            url: "/denied",
            templateUrl: "views/global/Denied.html",
            parent: 'pages',
            data: { pageTitle: 'Access Denied', right: rights.PUBLIC },
            controller: "DeniedController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            "js/controllers/global/DeniedController.js",
                            'assets/admin/layout/css/themes/darkblue-rtl.css',
                            'css/error.css'
                        ]
                    }]);
                }]
            }
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "views/global/profile.html",
            parent: 'pages',
            data: { pageTitle: 'Edit User Profile', right: rights.PUBLIC },
            controller: "ProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            "js/controllers/global/ProfileController.js"
                        ]
                    }]);
                }]
            }
        })

	}]);
