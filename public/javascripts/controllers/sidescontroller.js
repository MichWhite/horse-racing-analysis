var app = angular.module('PizzaPlaceWebApp');

app.controller('sidesController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Menu';
    findAll();

    function findAll() {
        $http.get('/sides')
            .success(function (data) {
                $scope.sides = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

  }]);
