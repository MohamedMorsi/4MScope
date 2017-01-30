angular.module('enozomApp').factory('UsersFactory', ['$http', 'settings', 'initContext', '$cookieStore'
    , 'RequestFactory', function ($http, settings, initContext, $cookieStore, RequestFactory) {
    return {
        getCurrentUser: function () {
            return RequestFactory.SendRequest('GET', initContext.get().apiBaseURL + 'Users/CurrentUser', null, null);
        }
    }
}]);
