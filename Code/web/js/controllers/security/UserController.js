enozomApp.controller('UserController', ['$rootScope', '$scope', 'CRUDFactory', '$location', '$stateParams', '$q', '$translate', function ($rootScope, $scope, CRUDFactory, $location, $stateParams, $q, $translate) {
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