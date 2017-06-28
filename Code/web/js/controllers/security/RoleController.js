enozomApp.controller('RoleController', ['$rootScope', '$scope', 'CRUDFactory', '$location', '$stateParams', 'RolesFactory', '$translate', function ($rootScope, $scope, CRUDFactory, $location, $stateParams, RolesFactory, $translate, i18nService) {
    //Global Variables
    $scope.role = {};
    $scope.FeaturesRights = [];
    $rootScope.submitted = false;
    $scope.edit = false;
    //Decalre Controllers Method
    $scope.save = function () {
        $rootScope.submitted = true;
        $scope.edit = true;
        if ($scope.addForm.$valid) {//submit form if valid
            //if edit
            if ($stateParams.id) {
                CRUDFactory.edit("Roles", $scope.role, $scope.role.RoleID).success(function (data, status, headers, config) {
                    $location.path('roles.html');
                });
            }
            else {//if add

                CRUDFactory.add("Roles", $scope.role).success(function (data, status, headers, config) {
                    $location.path('roles.html');
                });


            }
        } else {
            $scope.submitted = false;
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
    };
    $scope.redirect = function () {

        $location.path('roles.html');
    };
    $scope.hasError = function (field, validation) {
        if (validation) {
            return ($scope.addForm[field].$dirty && $scope.addForm[field].$error[validation]) || ($scope.edit && $scope.addForm[field].$error[validation]);
        }
        return ($scope.addForm[field].$dirty && $scope.addForm[field].$invalid) || ($scope.edit && $scope.addForm[field].$invalid);
    };

    $scope.getRightSelection = function (id) {
        if ($scope.role.RoleRights) {
            var rightItem = $.grep($scope.role.RoleRights, function (e) { return e.RightID == id; });
            if (rightItem.length == 0)
                return false;
            else
                return true;
        }
        else {
            return false;
        }
    }
    $scope.changeRight = function (id) {

        var rightItem = $.grep($scope.role.RoleRights, function (e) { return e.RightID == id; });
        if (rightItem.length == 0) {
            $scope.role.RoleRights.push({ RoleID: -1, RightID: id });
        } else if (rightItem.length != 0) {
            var index = $scope.role.RoleRights.indexOf(rightItem[0]);
            $scope.role.RoleRights[index].RoleID = 0;
        }
    };
    function getdata() {
        // get Features and Rights
        RolesFactory.getFeaturesRights("roles").success(function (data, status, headers, config) {
            $scope.FeaturesRights = data;
        }).error(function (data, status, headers, config) {
            raiseerror();
        });
    };
    if ($stateParams.id) {//Update Existing Item
        RolesFactory.getRole($stateParams.id).success(function (data, status, headers, config) {
            if (data) {
                $scope.role = data;
                //ON LOAD CODE
                getdata();
            }
        });
    }
    else {//Create New Item
        getdata();
    }
    //END



}]);