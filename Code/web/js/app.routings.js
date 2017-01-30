/// <reference path="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" />
/// <reference path="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" />
	/* Setup Rounting For All Pages */
enozomApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider,$httpProvider) {
	    
	    $httpProvider.interceptors.push('sessionInjector');

	    // Redirect any unmatched url
	    $urlRouterProvider.otherwise("/profile.html");

	    $stateProvider

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: { pageTitle: 'AngularJS UI Bootstrap' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })
        //Adapt-Strap
        .state('adaptstrap', {
            url: "/list.html",
            templateUrl: "views/list.html",
            data: { pageTitle: 'Adapt-Strap' },
            controller: "ListController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/ListController.js'
                        ]
                    }]);
                }]
            }
        })
        //Adapt-Strap
        .state('gridAddEdit', {
            url: "/gridAddEdit.html",
            templateUrl: "views/gridAddEdit.html",
            data: { pageTitle: 'gridAddEdit' },
            controller: "ListController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/ListController.js'
                        ]
                    }]);
                }]
            }
        })
        //Adapt-Strap
        .state('gridFilter', {
            url: "/gridFilter.html",
            templateUrl: "views/gridFilter.html",
            data: { pageTitle: 'grid Filter' },
            controller: "ListController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/ListController.js'
                        ]
                    }]);
                }]
            }
        })
        .state('Add', {
            url: "/Add.html",
            templateUrl: "views/Add.html",
            data: { pageTitle: 'grid Add' },
            controller: "ListController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
							'js/controllers/ListController.js'
                        ]
                    }]);
                }]
            }
        })
        .state('users', {
            url: "/users",
            templateUrl: "views/global/List.html",
            data: { pageTitle: 'Users List', right: Rights.users },
            controller: "UsersController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/security/UsersController.js',
                           'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',
                           'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                              'css/select2/selectize.default.css',
                              'css/select2/select2.css'
                        ]
                    }]);
                }]
            }
        })
        .state('UserAdd', {
            url: "/User",
            templateUrl: "views/security/User.html",
            data: { pageTitle: 'Add User', right: Rights.users },
            controller: "ManageUserController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/security/UsersController.js',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                               'css/select2/selectize.default.css',
                               'css/select2/select2.css'
                        ]
                    }]);
                }]
            }
        })
        .state('UserEdit', {
            url: "/User/:id",
            templateUrl: "views/security/User.html",
            data: { pageTitle: 'Edit User', right: Rights.users },
            controller: "ManageUserController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'enozomApp',
                        files: [
                            'js/controllers/security/UsersController.js',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                               'css/select2/selectize.default.css',
                               'css/select2/select2.css'
                        ]
                    }]);
                }]
            }
        })
        .state('roles', {
            url: "/roles",
            templateUrl: "views/global/List.html",
            data: { pageTitle: 'Roles List', right: Rights.roles },
            controller: "RolesController",
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
        .state('RoleAdd', {
            url: "/Role",
            templateUrl: "views/security/Role.html",
            data: { pageTitle: 'Add Role', right: Rights.roles },
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
        .state('RoleEdit', {
            url: "/Role/:id",
            templateUrl: "views/security/Role.html",
            templateUrl: "views/security/Role.html",
            data: { pageTitle: 'Edit Role', right: Rights.roles },
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

        .state('Denied', {
            url: "/Denied",
            templateUrl: "views/global/Denied.html",
            data: { pageTitle: 'Access Denied', right: Rights.PUBLIC },
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
            data: { pageTitle: 'Edit User Profile', right: Rights.PUBLIC },
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
