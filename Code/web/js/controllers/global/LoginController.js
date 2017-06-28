angular.module('enozomApp').controller('LoginController', login_Controller);

login_Controller.$inject = ['$scope', '$rootScope', '$location', 'LoginFactory', '$cookieStore', '$translate'];

function login_Controller($scope, $rootScope, $location, LoginFactory, $cookieStore, $translate) {
    // reset login status
    $translate.use('en');
    $scope.login = function () {

        LoginFactory.Login($scope.username, $scope.password).success(function (data, status, headers, config) {
            $cookieStore.put('key', data.access_token);
            document.getElementsByClassName('page-spinner-bar');
            var element = angular.element(document.getElementsByClassName('page-spinner-bar')[0]);
            element.removeClass('hide');
            window.location = "index.html";
        })
        .error(function (data, status, headers, config) {
            $scope.error = data.error_description;
            bootbox.alert({
                message: $translate.instant('Invalid Credentials'),
                buttons: {
                    ok: {
                        label: $translate.instant('close')
                    }
                },
                callback: function () {
                    return;
                }
            });
        });
    };
}

