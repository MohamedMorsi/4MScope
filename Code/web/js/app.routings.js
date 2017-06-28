/* Setup Rounting For All Pages */
enozomApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'rights', function ($stateProvider, $urlRouterProvider, $httpProvider, rights) {
	    
	    $httpProvider.interceptors.push('sessionInjector');

	    // Redirect any unmatched url
	    $urlRouterProvider.otherwise("/pages/profile.html");

	    $stateProvider

        .state('login', {
            url: "/login.html",
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
        url: "/users.html",
        templateUrl: "views/security/users.html",
        parent: 'pages',
        data: { pageTitle: 'Users List', right: rights.PUBLIC },
        controller: "UsersController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/UsersController.js'
                    ]
                }]);
            }]
        }
    })
    .state('UserAdd', {
        url: "/user.html",
        templateUrl: "views/security/User.html",
        parent: 'pages',
        data: { pageTitle: 'Add User', right: rights.PUBLIC },
        controller: "ManageUserController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/UsersController.js'
                    ]
                }]);
            }]
        }
    })
    .state('UserEdit', {
        url: "/user.html/:id",
        templateUrl: "views/security/User.html",
        parent: 'pages',
        data: { pageTitle: 'Edit User', right: rights.PUBLIC },
        controller: "ManageUserController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/UsersController.js'
                    ]
                }]);
            }]
        }
    })
    .state('roles', {
        url: "/roles.html",
        templateUrl: "views/security/roles.html",
        parent: 'pages',
        data: { pageTitle: 'Roles List', right: rights.PUBLIC },
        controller: "RolesController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/RolesController.js'
                    ]
                }]);
            }]
        }
    })
    .state('RoleAdd', {
        url: "/role.html",
        templateUrl: "views/security/Role.html",
        parent: 'pages',
        data: { pageTitle: 'Add Role', right: rights.PUBLIC },
        controller: "ManageRoleController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/RolesController.js'
                    ]
                }]);
            }]
        }
    })
    .state('RoleEdit', {
        url: "/role.html/:id",
        templateUrl: "views/security/Role.html",
        parent: 'pages',
        data: { pageTitle: 'Edit Role', right: rights.ROLES },
        controller: "ManageRoleController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'enozomApp',
                    files: [
                        'js/controllers/security/RolesController.js',
                        'js/factories/security/RolesFactory.js'
                    ]
                }]);
            }]
        }
    })

        .state('denied', {
            url: "/denied.html",
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
            url: "/profile.html",
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
