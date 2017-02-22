var app = angular.module('PizzaPlaceWebApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

            .when('/edit', {
                templateUrl : 'pages/addItem.ejs',
                controller  : 'addItemController'
            })

            .when('/menu', {
                templateUrl : 'pages/pizzas.ejs',
                controller  : 'pizzasController'
            })

            .when('/deserts', {
                templateUrl : 'pages/deserts.ejs',
                controller  : 'desertsController'
            })

            .when('/sides', {
                templateUrl : 'pages/sides.ejs',
                controller  : 'sidesController'
            })

            .when('/drinks', {
                templateUrl : 'pages/drinks.ejs',
                controller  : 'drinksController'
            });
    });


  
  


