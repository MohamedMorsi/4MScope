angular.module('enozomApp').factory('UploadFactory', ['$http', '$rootScope', 'settings', '$cookieStore', '$location', 'initContext', 'RequestFactory', 'Upload', function ($http, $rootScope, settings, $cookieStore, $location, initContext, RequestFactory, Upload) {
        return {
            upload: function (ControllerName, file, path,type) {
                var data = {path: path,type:type};
                return RequestFactory.upload('POST', initContext.get().apiBaseURL + ControllerName, data, file, null);
            }

        }
    }]);

