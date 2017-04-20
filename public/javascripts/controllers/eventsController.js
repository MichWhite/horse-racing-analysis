var app = angular.module('WebApp');

// app.controller('eventsController', ['$scope', '$http', function($scope, $http) {


    app.controller('eventsController', ['$scope', '$http',
        function($scope, $http) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = dd+'/'+mm+'/'+yyyy;

    $scope.message = "Today's Races - "+today;
    findAll();

    // $scope.getrace =function (event) {
    //     // if event If matches horse EventId race = array of horses
    //     var horsesRacing= [];
    //     function getHorses() {
    //
    //         $http.get('/horses')
    //             .success(function (data) {
    //               data.forEach(function(horse){
    //                     if(horse.EventId == event._id){
    //                         horsesRacing.push(horse)
    //                     }
    //                     else{
    //
    //                         alert('ERROR! NO Horse matching EventId Found');
    //                         console.log('ERROR NO HORSES MATCHING EVENT ID')
    //                     }
    //                 });
    //                 if(horsesRacing.length!=0){
    //                     return horsesRacing;
    //                 };
    //             })
    //             .error(function (data) {
    //                 console.log('Error: ' + data);
    //             });
    //     }
    //
    //
    // };

            $scope.query = {};
            $scope.queryBy = '$';
            var races = [];
            function findAll() {
                $http.get('/events')
                    .success(function (data) {
                        data.forEach(function (race) {
                            if(race.EventDate=="03/04/17"){
                                races.push(race);
                            }
                        });

                        $scope.events = races;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
    };



  }]);
