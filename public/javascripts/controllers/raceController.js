/**
 * Created by michealin on 3/22/2017.
 */
// var Calculation = require('../retriveData/Calculation');


var app = angular.module('WebApp');

app.controller('raceController', ['$scope', '$routeParams', '$http','historical',
    function($scope, $routeParams, $http, historical) {

    historicalRaces =[];
        findAllHistorical();

    Event = [];


        function findAllHistorical() {
            $http.get('/historical')
                .success(function (data) {
                    console.log('Getting all historical Data');
                    historicalRaces.push(data);
                    findEvent();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }

EventName = '';

        function findEvent() {
            $http.get('/events/'+$routeParams.EventId)
                .success(function (data) {
                    // console.log(data);
                    // $scope.event = data;
                    EventName =data[0].EventName;
                    Event.push(data[0]);
                    $scope.event = data[0];
                    findAllHorses();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }




    function findAllHorses() {
         $http.get('/horses/'+$routeParams.EventId)
            .success(function (data) {

                data.forEach(function (horse) {
                    // console.log(horse);
                   horse['Score'] = Calculation(horse);
                });
                $scope.races = data;
                horses= data;
                generateChart();

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
         console.log('test');
    }





    function generateChart(){
        console.log('GENERATE CHART');
        var HorseArray = [];
        var ScoreArray = [];
        $http.get('/horses/'+$routeParams.EventId)
            .success(function (data) {
                data.forEach( function (horse)
                {
                    horse['Score'] = Calculation(horse);

                    HorseArray.push(horse.HorseName);

                    ScoreArray.push(horse['Score']);


                    var canvas = document.getElementById('myChart').getContext("2d");
                    var data = {
                        labels: HorseArray,
                        datasets: [
                            {
                                label: EventName,
                                backgroundColor: "lightgreen",
                                borderColor: "green",
                                borderWidth: 2,
                                hoverBackgroundColor: "green",
                                hoverBorderColor: "green",
                                data: ScoreArray
                            }
                        ]
                    };
                    var option = {
                        series: {
                            states: {
                                hover: {
                                    enabled: false
                                }
                            }
                        },

                        scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                        animation: {
                            duration:5000
                        }

                    };

                    canvas.chart && canvas.chart.destroy();

                    var BarChart = Chart.Bar(canvas,{
                        data:data,
                        options:option
                    });
                    canvas.chart = BarChart;
                });
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    }



// console.log(historical);


        function Calculation(horse){

            Score =50;


                // Object { _id: "58e25e8ff36d2878e0373272",
                //     EventId: "58e227aef36d2878e0371898",
                //     RunnerNo: 8,
                //     HorseName: "Theodorico",
                //     HorseForm: "8",
                //     HorseAge: 4,
                //     HorseWeiht: "10-10",
                //     Trainer: "David Loughnane",
                //     Jockey: "Jamie Bargary",
                //     OR: null }
                var eDistance =Event[0].EventLocation.slice(0, 4);

            historicalRaces[0].forEach(function (histRace) {
                var histposition =histRace['Position'].split('/');

                if(histRace['RunnerName']==horse.HorseName){
                    console.log(histRace['RunnerName']);
                    if(histposition[1]<=Event[0]['EventNoRunners']
                        && histRace['Class'] ==Event['EventClass'] && Event[0].EventLength == histRace['Distance'] && eDistance  == histRace['Course']) {
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }

                   else if(histposition[1]<=Event[0]['EventNoRunners']
                        && histposition[0]<4
                        && Event[0].EventLength == histRace['Distance']) {
                        if(histposition[0]==1){
                            Score = Score+100;
                        }
                        if(histposition[0]==2){
                            Score = Score+50;
                        }

                        if(histposition[0]==3){
                            Score = Score+30;
                        }
                    }
                    else  if(histRace['Going']==Event[0]['EventGoing']) {
                        if(histposition[0]==1){
                            Score = Score+100;
                        }
                        if(histposition[0]==2){
                            Score = Score+50;
                        }

                        if(histposition[0]==3){
                            Score = Score+30;
                        }
                    }
                    else  if(Event[0].EventLength == histRace['Distance']) {
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }





                }


            ////TRAINER ANALYSIS
                var histposition =histRace['Position'].split('/');

                if(histRace['Trainer']==horse.Trainer){

                    if(histposition[1]<=Event[0]['EventNoRunners']
                        && histposition[0]<4) {
                        // console.log(histRace);
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }
                    //If it ran with this no of runners or less
                    else if(Event[0].EventLength == histRace['Distance']){
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }

                    else if(eDistance  == histRace['Course']){
                        console.log('TRACK THE SAME');
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }
                }



            ////JOCKEY ANALYSIS

                if(histRace['Jockey']==horse.Jockey){

                    if(histposition[1]<=Event[0]['EventNoRunners']
                        && histposition[0]<4) {
                        // console.log(histRace);
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }
                    //If it ran with this no of runners or less
                   else if(Event[0].EventLength == histRace['Distance']){
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }

                    else if(eDistance  == histRace['Course'] && histRace['Going'] == Event.EventGoing){
                        console.log('TRACK THE SAME');
                        if(histposition[0]==1){
                            Score = Score+50;
                        }
                        if(histposition[0]==2){
                            Score = Score+25;
                        }

                        if(histposition[0]==3){
                            Score = Score+10;
                        }
                    }





                }
            });


            //For each horse in the race look at:
            // Form,
            // OR,
            // Age,
            // Weight,
            // Position on that course,
            // Position with that going,
            // Position with that no of Runners,
            // Position with that Distance,
            // with that Class,,
            // did the class of the horse change?

            //Do the Same for the jockey and Trainer for that horse

           // console.log(historical['Position']);
           //  console.log( historical['RunnerName']);
           //  console.log(historical['Course']);
           //  console.log(historical['Distance']);
           //  console.log(historical['Going']);
           //  console.log(historical['Class']);
           //  console.log(historical['Trainer']);
           //  console.log(historical['Jockey']);


            // console.log(Event['EventLocation']);
            // console.log(Event['EventGoing']);
            // console.log(Event['EventNoRunners)']);
            // console.log(Event['EventAgeCategory']);
            // console.log(Event['EventClass']);
            // console.log(Event['EventLength']);


            // console.log(horse['HorseName']);
            // console.log(horse['HorseForm']);
            // console.log(horse['HorseAge']);
            // console.log(horse['HorseWeiht']);
            // console.log(horse['Trainer']);
            // console.log(horse['Jockey']);
            // console.log(horse['OR']);


            //
            // historical['course'].forEach(function(histCourse){
            //
            //
            // });

            //If the horse at that distance on that course with the position between 1 and 3 give score 100

            //Horse Distance =10
            //OR
            //Horse NoOfRunners = 10
            //Horse Position = 50
            //Horse Position on Same course = 70
            //Horse Weight
            //Horse Age
            //Horse FORM
            //Horse CLass
            // Horse historical with that going

            //Trainer form
            //Trainer distance and going what position
            //Trainer position from that course
            //Trainer course history

            //Jockey form
            //Jockey distance  and going what  position
            //Jockey position from that course
            //Jockey course hostory
return Score;

        }




}]);
