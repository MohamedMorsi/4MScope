angular.module('enozomApp').controller('UsersController', ['$rootScope', '$scope', 'CRUDFactory', 'settings', 'GridService', '$location', '$translate', 'NgTableParams', function ($rootScope, $scope, CRUDFactory, settings, GridService, $location, $translate, NgTableParams) {
    //---------------Variables-------------------------//
    $scope.rolesList = [];
    $scope.filterObject = {};
    //------------------------------User LIST PAGE---------------------------//
    $scope.getList = function () {

        var initialParams = {
            count: settings.pageSize // initial page size
        };
        var initialSettings = {
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            getData: function (params) {
                var orderBy = params.orderBy();
                var OrderByParam = GridService.getSortExpression(orderBy, 'UserName');
                var OrderByDirection = GridService.getSortDirection(orderBy);
                $scope.filterObject.PageNumber = params.page();
                $scope.filterObject.SortBy = OrderByParam;
                $scope.filterObject.SortDirection = OrderByDirection;
                // ajax request to api
                return CRUDFactory.getPaginatedList("Users", $scope.filterObject).then(function (result) {
                    params.total(result.data.TotalRecords); // recal. page nav controls
                    return result.data.Results;
                });
            }
        };

        $scope.tableParams = new NgTableParams(initialParams, initialSettings);
    }

    $scope.editRow = function (row) {
        $location.path('user.html/' + row.UserID);
    }

    $scope.deleteRow = function (row) {

        bootbox.confirm(
       {
           message: $translate.instant('confirm'),
           buttons: {
               confirm: {
                   label: $translate.instant('ok'),
                   className: "btn green"
               },
               cancel: {
                   label: $translate.instant('cancel'),
                   className: "bg-grey bg-font-grey"
               }
           },
           callback: function (result) {
               if (result)
                   CRUDFactory.delete("Users", row.entity.UserID).success(function (data, status, headers, config) {
                       $scope.getList();
                   });
           }
       });
    }

    $scope.getRoles = function () {
        CRUDFactory.getList("Roles").success(function (data, status, headers, config) {
            $scope.rolesList = data;
        });
    };

    $scope.getList();


}]);



enozomApp.controller('ManageUserController', ['$rootScope', '$scope', 'CRUDFactory', '$location', '$stateParams', '$q', '$translate', function ($rootScope, $scope, CRUDFactory, $location, $stateParams, $q, $translate) {
    $scope.user = {};
    $scope.rolesList = [];
    $rootScope.submitted = false;
    $scope.edit = false;
    $scope.redirect = function () {
        $location.path('users.html');
    }
    $scope.hasError = function (field, validation) {
        if (validation) {
            return ($scope.addForm[field].$dirty && $scope.addForm[field].$error[validation]) || ($scope.edit && $scope.addForm[field].$error[validation]);
        }
        return ($scope.addForm[field].$dirty && $scope.addForm[field].$invalid) || ($scope.edit && $scope.addForm[field].$invalid);
    };
    $scope.save = function () {
        $rootScope.submitted = true;
        $scope.edit = true;
        if ($scope.addForm.$valid) {//submit form if valid
            if ($stateParams.id) {//if edit
                CRUDFactory.edit("Users", $scope.user, $scope.user.UserID).success(function (data, status, headers, config) {
                    $location.path('users.html');
                });
            }
            else {//if add
              
                CRUDFactory.add("Users", $scope.user).success(function (data, status, headers, config) {
                    $location.path('users.html');
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

    var p1 = CRUDFactory.getList("Roles").success(function (data, status, headers, config) {
        $scope.rolesList = data;
    });
    if ($stateParams.id) {
        $q.all([p1]).then(function () {
            CRUDFactory.get("Users", $stateParams.id).success(function (data, status, headers, config) {
                $scope.user = data;
            });
        });
    }

}]);