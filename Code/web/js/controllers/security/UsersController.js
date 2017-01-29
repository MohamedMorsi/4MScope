enozomApp.controller('UsersController', ['$rootScope', '$scope', 'CRUDFactory', 'settings', '$location', '$translate', 'i18nService', function ($rootScope, $scope, CRUDFactory, settings, $location, $translate, i18nService) {

    $scope.text = 'User';
    $scope.SeeText = $translate.instant('see_users');
    $scope.AddText = $translate.instant('add_user');
    $scope.ListText = $translate.instant('list_users');
    $scope.dir = settings.globalDirection;
    $scope.langs = i18nService.getAllLangs();
    $scope.lang = settings.globalLang;
    $scope.bread_crumb = 'security_panel';

    //------------------------------User LIST PAGE---------------------------//
    //------------------------------User LIST PAGE---------------------------//
    //------------------------------User LIST PAGE---------------------------//
    //------------------------------User LIST PAGE---------------------------//
    $scope.getPage = function () {
        CRUDFactory.getList("Users").success(function (data, status, headers, config) {
            $scope.gridOptions.totalItems = data.length;
            $scope.gridOptions.data = data
        });
    };

    $scope.editRow = function (grid, row) {       
        $location.path('User/' + row.entity.UserID);        
    }
    $scope.deleteRow = function (grid, row) {
        if (row.entity.Role.IsSystem) {
            bootbox.alert({
                message: $translate.instant('cant_delete_admin'),
                buttons: {
                    ok: {
                        label: $translate.instant('close')
                    }
                },
                callback: function () {
                    return;
                }
            });
        } else {
            bootbox.confirm(
           {
               message: $translate.instant('confirm'),
               buttons: {
                   confirm: {
                       label: $translate.instant('ok')
                   },
                   cancel: {
                       label: $translate.instant('cancel')
                   }
               },
               callback: function (result) {
                   if (result)
                       CRUDFactory.delete("Users", row.entity.UserID).success(function (data, status, headers, config) {
                           $scope.getPage();
                       });
               }
           });
        }
    }

    $scope.gridOptions = {
        enableSorting: true,        
        columnDefs: [
                    { name: $translate.instant('UserName'), field: 'UserName', enableHiding: false },
                    { name: $translate.instant('FullName'), field: 'FullName', enableHiding: false },
                    { name: $translate.instant('Role'), field: 'Role.RoleName', enableHiding: false },
                    { name: $translate.instant('Active'), field: 'IsActive', cellTemplate: 'views/templates/user/ActiveColumn_tpl.html', enableFiltering: false, enableSorting: false, enableHiding: false },
                    { name: $translate.instant('edit'), displayName: '', cellTemplate: 'views/templates/grid_general/Edit_tpl.html', enableFiltering: false, enableSorting: false, enableHiding: false },
                    { name: $translate.instant('delete'), displayName: '', cellTemplate: 'views/templates/grid_general/Delete_tpl.html', enableFiltering: false, enableSorting: false, enableHiding: false },
        ],
        paginationPageSizes: [settings.pageSize, settings.biggerPageSize],
        paginationPageSize: settings.pageSize,
        enableColumnResizing: true,
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };
    $scope.getPage();
}]);



enozomApp.controller('ManageUserController', ['$rootScope', '$scope', 'CRUDFactory', '$location', '$stateParams', '$q', '$translate', 'i18nService', function ($rootScope, $scope, CRUDFactory, $location, $stateParams, $q, $translate, i18nService) {
    $scope.user = {};
    $rootScope.submitted = false;
    var p1 = CRUDFactory.getList("Roles").success(function (data, status, headers, config) {
        $scope.rolesList = data;
    });
    $scope.text = $translate.instant('add');
    $scope.icon = 'fa fa-plus';
    if ($stateParams.id) {
        $scope.text = $translate.instant('edit');
        $scope.icon = 'fa fa-pencil-square-o';
        $q.all([p1]).then(function () {
            CRUDFactory.get("Users", $stateParams.id).success(function (data, status, headers, config) {
                $scope.user = data;
                $scope.edit = true;
                $(".checker").removeClass();//blacklist checkbox binds correctly but some script adds a div that makes checkbox doesn't appear
            });
        });
    }
    
    $scope.redirect = function () {
        $location.path('users');
    }
    $scope.submitUser = function () {
        $rootScope.submitted = true;
        
                if ($scope.addForm.$valid) {//submit form if valid
                    if ($stateParams.id) {//if edit
                        CRUDFactory.edit("Users", $scope.user, $scope.user.UserID).success(function (data, status, headers, config) {
                            $location.path('users');
                        });
                    }
                    else {//if add
                        CRUDFactory.add("Users", $scope.user).success(function (data, status, headers, config) {
                            $location.path('users');
                        });
                    }
                } else {
                    $rootScope.submitted = false;
                    bootbox.alert({
                        message: $translate.instant('form_invalid'),
                        buttons: {
                            ok: {
                                label: $translate.instant('close')
                            }
                        },
                        callback: function () {
                            return;
                        }
                    });
                }
    }
    

    $scope.hasError = function (field, validation) {
        if (validation) {
            return ($scope.addForm[field].$dirty && $scope.addForm[field].$error[validation]) || ($rootScope.submitted && $scope.addForm[field].$error[validation]);
        }
        return ($scope.addForm[field].$dirty && $scope.addForm[field].$invalid) || ($rootScope.submitted && $scope.addForm[field].$invalid);
    };
}]);