(function() {
    'use strict';
    angular
        .module('scrumboard.demo')
        .controller('LoginController',
            ['$scope', '$location', 'Login', LoginController]);
    function LoginController($scope, $location, Login) {
        $scope.login = function() {
           Login.login($scope.user)
                .then(function(response) {
                    $location.url('/');
                },
                function(error) {
                    $scope.login_error_message = error.data.message;
                });
        }
        if (Login.isLoggedIn()) {
            $location.url('/');
        }
    }
})();