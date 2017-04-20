var app = angular.module('WebApp');

    app.controller('resultsController', ['$scope', '$http',
        function($scope, $http) {


            $scope.isAccordionOpen=false;
            $scope.$watch('isAccordionOpen', function(isOpen){
                console.log('First group was opened');
            });

            $scope.query = {};
            $scope.queryBy = '$';
    $scope.message = "Results ";
            Allhorses= [];
            findHorses();



    function findAll() {
        $http.get('/results')
            .success(function (data) {
                data.forEach(function (result) {


                    $http.get('/events/'+result.EventID)
                        .success(function (event) {


                            result['EventDate'] = event[0].EventDate;
                            result['EventName'] = event[0].EventName;
                            result['EventTime'] = event[0].EventTime;
                            result['EventLocation'] = event[0].EventLocation;
                        });
                console.log(result);
                    result.Result.forEach(function (horse){

                        Allhorses.forEach(function (runner) {
                            if (runner._id == horse.Horse) {
                                horse['horseName'] = runner.HorseName;
                                horse['trainerName'] = runner.Trainer;
                                horse['jockeyName'] = runner.Jockey;
                            }
                        });
                    });

console.log(result)
                });
                $scope.results = data;
    })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }


    //         function findEvent(EventId) {
    //     var Event;
    //             $http.get('/events/'+EventId)
    //                 .success(function (data) {
    //                     // console.log(data);
    //                     // $scope.event = data;
    //                     // EventName =data[0].EventName;
    //                     // Event.push(data[0]);
    //                     AllEvents.push(data[0]);
    //                     Event = data[0];
    //                     return Event
    //                 })
    //                 .error(function (data) {
    //                     console.log('Error: ' + data);
    //                 });
    // return Event;
    // }

            function findHorses() {
                $http.get('/horses/')
                    .success(function (data) {
                        Allhorses = data;
                        findAll();
                        return data;

                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }




  }]);
