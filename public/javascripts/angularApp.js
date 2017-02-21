var app = angular.module('PizzaPlaceWebApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

             // route for the donate page
            .when('/edit', {
                templateUrl : 'pages/addItem.ejs',
                controller  : 'addItemController'
            })

             // route for the donations page
            .when('/menu', {
                templateUrl : 'pages/items.ejs',
                controller  : 'itemsController'
            });
    });


  
  


