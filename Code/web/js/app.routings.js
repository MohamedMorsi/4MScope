/* Setup Rounting For All Pages */
enozomApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider,$httpProvider) {
	    
	    $httpProvider.interceptors.push('sessionInjector');

	    // Redirect any unmatched url
	    $urlRouterProvider.otherwise("/profile.html");

	    $stateProvider

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
            url: "/users.html",
            templateUrl: "views/global/List.html",
            data: { pageTitle: 'Users List', right: Rights.USERS },
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
            url: "/user.html",
            templateUrl: "views/security/User.html",
            data: { pageTitle: 'Add User', right: Rights.USERS },
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
            url: "/user.html/:id",
            templateUrl: "views/security/User.html",
            data: { pageTitle: 'Edit User', right: Rights.USERS },
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
            url: "/roles.html",
            templateUrl: "views/security/rolesList.html",
            data: { pageTitle: 'Roles List', right: Rights.ROLES },
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
            url: "/role.html",
            templateUrl: "views/security/Role.html",
            data: { pageTitle: 'Add Role', right: Rights.ROLES },
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
            url: "/role.html/:id",
            templateUrl: "views/security/Role.html",
            data: { pageTitle: 'Edit Role', right: Rights.ROLES },
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
