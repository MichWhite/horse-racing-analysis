var app = angular.module('WebApp');

// app.controller('eventsController', ['$scope', '$http', function($scope, $http) {


    app.controller('tomorrowsEventsController', ['$scope', '$http',
        function($scope, $http) {

    var today = new Date();
    var dd = today.getDate()+1;
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = dd+'/'+mm+'/'+yyyy;

    $scope.message = "Tomorrow's Races - "+today;
    findAll();

            $scope.query = {};
            $scope.queryBy = '$';
            var TomRaces = [];
            function findAll() {
        $http.get('/events')
            .success(function (data) {
                data.forEach(function (race) {
                    if(race.EventDate=="04/04/17"){
                        TomRaces.push(race);
                    }
                    });
                console.log(TomRaces);
                $scope.events = TomRaces;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };



  }]);
