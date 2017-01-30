angular.module('enozomApp').factory('RequestFactory', ['$http', '$rootScope', 'settings', '$cookieStore', '$location', '$translate', 'initContext', function ($http, $rootScope, settings, $cookieStore, $location, $translate, initContext) {
        return {
            SendRequest: function (method, url, data, responseType) {

                var header = {};
                header['method'] = method;
                header['url'] = url; //+ '?token=' + $cookieStore.get('key');

                if (data) {
                    header['data'] = data;
                }
                if (responseType) {
                    header['responseType'] = responseType;
                }

                var result = $http(header).error(function (data, status, headers, config) {
                    if (status === 401)
                    {
                        window.location = "login.html";
                    }
                    else if (status === 400)
                    {
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
                    else if (status === 500)
                    {
                        $rootScope.submitted = false;
                        bootbox.alert({
                            message: $translate.instant('something_went_wrong'),
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
                });
                return result;
            }
        }
    }]);

enozomApp.factory('sessionInjector', ['$cookieStore', function ($cookieStore) {
        var sessionInjector = {
            request: function (config) {
                // if (!SessionService.isAnonymus) {
                config.headers['cache'] = false;
                config.headers['foobar'] = new Date().getTime();
                config.headers['Authorization'] = 'Bearer ' + $cookieStore.get('key');
                //  }
                return config;
            }
        };
        return sessionInjector;
    }]);

