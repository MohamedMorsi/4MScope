angular.module('enozomApp').factory('UsersFactory', ['$http', 'settings', 'appConfigs', '$cookieStore'
    , 'RequestFactory', function ($http, settings, appConfigs, $cookieStore, RequestFactory) {
    return {
        getCurrentUser: function () {
            return RequestFactory.SendRequest('GET', appConfigs.apiBaseURL + 'Users/CurrentUser', null, null);
        },
        getCustomerServiceUsers: function (keyWordName) {
            return RequestFactory.SendRequest('GET', appConfigs.apiBaseURL + 'Users/CustomerServiceUsers?keyWordName=' + keyWordName, null, null);
        },
        getSalesUsers: function (keyWordName) {
            return RequestFactory.SendRequest('GET', appConfigs.apiBaseURL + 'Users/SalesUsers?keyWordName=' + keyWordName, null, null);
        },

    }
}]);
