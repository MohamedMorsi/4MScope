angular.module('enozomApp').controller('RolesController', ['$rootScope', '$scope', 'CRUDFactory', 'settings', '$location', '$translate', function ($rootScope, $scope, CRUDFactory, settings, $location, $translate) {

    $scope.text = 'Role';
    $scope.SeeText = $translate.instant('see_roles');
    $scope.AddText = $translate.instant('add_role');
    $scope.ListText = $translate.instant('list_roles');
    $scope.dir = settings.globalDirection;
    $scope.lang = settings.globalLang;
    $scope.bread_crumb = 'security_panel';
    //------------------------------Role LIST PAGE---------------------------//
    $scope.getPage = function () {
        CRUDFactory.getList("Roles").success(function (data, status, headers, config) {
            $scope.gridOptions.totalItems = data.length;
            $scope.gridOptions.data = data
        });
    };

    $scope.editRow = function (grid, row) {
        if (row.entity.IsSystem) {
            bootbox.alert({
                message: $translate.instant('cant_edit_admin'),
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
            $location.path('Role/' + row.entity.RoleID);
        }
    }
    $scope.deleteRow = function (grid, row) {
        if (row.entity.IsSystem) {
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
                       CRUDFactory.delete("Roles", row.entity.RoleID).success(function (data, status, headers, config) {
                           $scope.getPage();
                       });
               }
           });
        }
    }

    $scope.gridOptions = [
  {
      columnHeaderDisplayName: 'RoleName',
      displayProperty: $translate.instant('name'),
      sortKey: 'RoleName'
  }
    ];

    $scope.artistsAjaxConfigSearch = {
        url: 'http://ws.audioscrobbler.com/2.0/',
        method: 'JSONP',
        params: {
            api_key: '9b0cdcf446cc96dea3e747787ad23575',
            artist: '50 cent',
            method: 'artist.search',
            format: 'json'
        },
        paginationConfig: {
            response: {
                totalItems: 'results.opensearch:totalResults',
                itemsLocation: 'results.artistmatches.artist'
            }
        }
    };
}]);

enozomApp.controller('ManageRoleController', ['$rootScope', '$scope', 'CRUDFactory', '$location', '$stateParams', 'RolesFactory', '$translate', 'i18nService', function ($rootScope, $scope, CRUDFactory, $location, $stateParams, RolesFactory, $translate, i18nService) {
    //Global Variables
    $scope.role = { role_name: "", RoleRightsIDs: [], RoleRights: [] };
    $scope.text = $translate.instant('add');
    $scope.icon = 'fa fa-plus';

    //END

    //Decalre Controllers Method
    $scope.save = function () {
        $scope.submitted = true;
        $scope.error = true;
        if ($scope.addForm.$valid) {//submit form if valid
            //if edit
            if ($stateParams.id) {
                CRUDFactory.edit("Roles", $scope.role, $scope.role.RoleID).success(function (data, status, headers, config) {
                    $location.path('Roles');
                });
            }
            else {//if add

                CRUDFactory.add("Roles", $scope.role).success(function (data, status, headers, config) {
                    $location.path('Roles');
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

        $location.path('Roles');
    };

    $scope.hasError = function (field, validation) {

        if (validation) {
            return ($scope.addForm[field].$dirty && $scope.addForm[field].$error[validation]) || ($scope.error && $scope.addForm[field].$error[validation]);
        }

        return ($scope.addForm[field].$dirty && $scope.addForm[field].$invalid) || ($scope.error && $scope.addForm[field].$invalid);
    };

    $scope.getRightSelection = function (id) {
        var rightItem = $.grep($scope.role.RoleRights, function (e) { return e.RightID == id; });
        if (rightItem.length == 0)
            return false;
        else
            return true;
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
    }
    ;
    //END


    if ($stateParams.id) {
        $scope.text = $translate.instant('edit');
        $scope.icon = 'fa fa-pencil-square-o';

        RolesFactory.getRole($stateParams.id).success(function (data, status, headers, config) {
            if (data) {
                $scope.role = data;
                $scope.edit = true;
                //ON LOAD CODE
                getdata();
            }
        });
    }
    else {

        //ON LOAD CODE
        getdata();
    }
    //END
}]);