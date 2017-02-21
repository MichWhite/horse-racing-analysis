var app = angular.module('PizzaPlaceWebApp');

app.controller('itemsController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Menu';
    findAll();
    function findAll() {
        $http.get('/items')
            .success(function (data) {
                $scope.items = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

  }

  ]);
