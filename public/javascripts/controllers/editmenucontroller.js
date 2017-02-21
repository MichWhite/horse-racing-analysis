var app = angular.module('PizzaPlaceWebApp');

app.controller('addItemController', ['$scope', function($scope) {
    
    $scope.formData = {};

    $scope.name = "";
    $scope.formData.price = 0.00;
    $scope.formData.description = "";
    $scope.formData.calories = 0;
    $scope.options = [{ name: "Pizza", id: 0 }, { name: "Drink", id: 1 }, { name: "Side", id: 2 }, { name: "Desert", id: 3 }];

    $scope.formData.type = $scope.options[0];

  }

  ]);
