(function() {
    'use strict';
    angular
        .module('scrumboard.demo')
        .service('Login', ['$http', '$location', Login]);
    function Login($http, $location) {
        this.login = login;
        this.isLoggedIn = isLoggedIn;
        this.logout = logout;
        this.redirectIfNotLoggedIn = redirectIfNotLoggedIn;
        function login(credentials) {
            return $http.post('/auth_api/login/', credentials)
                .then(function(response) {
                    localStorage.currentuser = JSON.stringify(response.data);
                });
        }
        function isLoggedIn() {
            return !!localStorage.currentuser;
        }
        function logout() {
            delete localStorage.currentuser;
            $http.get('/auth_api/logout/').then(function() {
                $location.url('/login');
            });
        }
        function redirectIfNotLoggedIn() {
            if (!isLoggedIn()) {
                $location.url('/login');
            }
        }
    }
})();