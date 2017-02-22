var app = angular.module('PizzaPlaceWebApp');

app.controller('pizzasController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Pizzas';
    findAll();

    function findAll() {
        $http.get('/pizzas')
            .success(function (data) {
                $scope.pizzas = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

  }]);
