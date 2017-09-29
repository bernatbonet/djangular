(function(){
    'use strict';
    angular.module('scrumboard.demo', ['ngRoute'])
        .controller('ScrumboardController', ['$scope', '$http', 'Login', ScrumboardController]);
    function ScrumboardController($scope, $http, Login) {
        $scope.add = function (list, title) {
            var card = {
                list: list.id,
                title: title
            };
            $http.post('/scrumboard/cards/', card)
                .then(function(response) {
                    list.cards.push(response.data);
                },
                function() {
                    console.error('Could not create card');
                }); 
        };

        Login.redirectIfNotLoggedIn();
        $scope.data = [];
        $scope.logout = Login.logout;
        $scope.sortBy = 'title';
        $scope.reverse = true;
        $scope.showFilters = false;

        $http.get('/scrumboard/lists').then(
            function(response) {
                $scope.data = response.data;
            }
        );
    }
}());