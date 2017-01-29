enozomApp.factory('RolesFactory', ['$http', 'settings', 'initContext', '$cookieStore'
    , 'RequestFactory', function ($http, settings, initContext, $cookieStore, RequestFactory) {
    return {
        getFeaturesRights: function () {
            return RequestFactory.SendRequest('GET', initContext.get().apiBaseURL + 'Roles/getFeaturesRights/', null, null);           
        },
        getRole: function (id) {
            return RequestFactory.SendRequest('GET', initContext.get().apiBaseURL + 'Roles/' + id, null, null);
        },
        getRoleSideMenu: function () {
            return RequestFactory.SendRequest('GET', initContext.get().apiBaseURL + 'Roles/getRoleSideMenu/', null, null);
        }
    }
}]);
