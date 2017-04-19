var app = angular.module('WebApp', ['ngRoute', 'ui', 'ui.filters']);


app.factory('historical', ['$http', function($http) {
    var historical = [];


    return {
        historical:  function findAllHistorical() {
        $http.get('/historical')
            .success(function (data) {
                console.log('HOW?' +data);
                historical = data;
                return data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
    }
}]);






app.config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider

            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

            .when('/events', {
                templateUrl : 'pages/events.ejs',
                controller  : 'eventsController'
            }).
        when('/races/:EventId', {
            templateUrl: 'pages/races.ejs',
            controller: 'raceController'

        }).
        when('/results', {
            templateUrl: 'pages/results.ejs',
            controller: 'resultsController'

        });

    }]);


  
  


