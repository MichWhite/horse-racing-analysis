/**
 * Created by michealin on 3/14/2017.
 */

    function Calculation(horse){
    Score = 0;

    //For each horse in the race look at Form, OR, Age, Weight,
    // Position on that course, Position with that going,
    // Position with that no of Runners, Position with that Distance,
    //  with that Class,,, did the class of the horse change?

    //Do the Same for the jockey and Trainer for that horse

    historical['Position']
    historical['RunnerName']
    historical['Course']
    historical['Distance']
    historical['Going']
    historical['Class']
    historical['Trainer']
    historical['Jockey']


    Event['EventLocation']
    Event['EventGoing']
    Event['EventNoRunners']
    Event['EventAgeCategory']
    Event['EventClass']
    Event['EventLength']


    Horse['HorseName']
    Horse['HorseForm']
    Horse['HorseAge']
    Horse['HorseWeiht']
    Horse['Trainer']
    Horse['Jockey']
    Horse['OR']



    historical['course'].forEach(function(histCourse){


        });
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


    }





    function findAllHistorical() {
        $http.get('/historical')
            .success(function (data) {
                console.log(data);
               historical = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
