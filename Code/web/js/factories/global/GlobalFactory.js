﻿enozomApp.factory('CRUDFactory', ['$http', '$rootScope', 'settings', '$cookieStore', '$location', 'initContext', 'RequestFactory', function ($http, $rootScope, settings, $cookieStore, $location, initContext, RequestFactory) {
    return {
        getList: function (ControllerName) {
            return RequestFactory.SendRequest('GET', initContext.get().apiBaseURL + ControllerName , null, null);
        },
        get: function (ControllerName, id) {
            return RequestFactory.SendRequest('GET', initContext.get().apiBaseURL + ControllerName + '/' + id, null, null);
        },
        add: function (ControllerName, addedObject) {
            return RequestFactory.SendRequest('POST', initContext.get().apiBaseURL + ControllerName, addedObject, null);           
        },
        edit: function (ControllerName, editedObject, id) {
            return RequestFactory.SendRequest('PUT', initContext.get().apiBaseURL + ControllerName + '/' + id, editedObject, null);            
        },
        delete: function (ControllerName, id) {
            return RequestFactory.SendRequest('DELETE', initContext.get().apiBaseURL + ControllerName + '/' + id,null, null);
        },
    }
}]);
