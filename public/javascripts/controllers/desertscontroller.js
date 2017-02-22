var app = angular.module('PizzaPlaceWebApp');

app.controller('desertsController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Deserts';
    findAll();

    function findAll() {
        $http.get('/deserts')
            .success(function (data) {
                $scope.deserts = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

  }]);
