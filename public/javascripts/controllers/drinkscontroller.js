var app = angular.module('PizzaPlaceWebApp');

app.controller('drinksController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Menu';
    findAll();

    function findAll() {
        $http.get('/drinks')
            .success(function (data) {
                $scope.drinks = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

  }]);
