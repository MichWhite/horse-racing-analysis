var betfair = require('betfair');
var session = new betfair.BetfairSession('ObRsEEm1i9p0lIsM');
var fs = require('fs')


// console.log(session)
var jsonDate = new Date().toJSON();
tempEventArray =[];
tempHorseArray =[];

start();
var async = require('async'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var EventsSchema = new mongoose.Schema({
        "_id": String,
        "name": String,
        "Country": String,
        "venue": String,
        "date": String,
        "time": String}
    ,{ "_id": false });

var Event = mongoose.model('events',EventsSchema,'events');

mongoose.connect('mongodb://admin:admin@dbh54.mlab.com:27547/horseracing');

async.series(
    [
        // Start fresh
        function(callback) {
            Event.remove({},callback);
        },

        // Ordered will fail on error. Upserts never fail!
        function(callback) {
            var bulk = Event.collection.initializeOrderedBulkOp();
            tempEventArray.forEach(function(item) {
                bulk.find({ "_id": item._id }).upsert().updateOne({
                    "$setOnInsert": { "name": item.name }
                });
            });
            bulk.execute(callback);
        },

        // All as expected
        function(callback) {
            Event.find().exec(function(err,docs) {
                // console.log(docs)
                callback(err);
            });
        },


        // Start again
        function(callback) {
            Event.remove({},callback);
        },

        // Unordered will just continue on error and record an error
        function(callback) {
            var bulk = Event.collection.initializeUnorderedBulkOp();
            tempEventArray.forEach(function(item) {
                bulk.insert(item);
            });
            bulk.execute(function(err,result) {
                callback(); // so what! Could not care about errors
            });
        },


        // Still processed the whole batch
        function(callback) {
            Event.find().exec(function(err,docs) {
                // console.log(docs)
                callback(err);
            });
        }
    ],
    function(err) {
        if (err) throw err;
        mongoose.disconnect();
    }
)

function start() {
    session.login('mich.white@hotmail.com','PasswordForAPI123', function(err) {
        console.log(err ? "Login failed " + err : "Login OK");
        session.keepAlive();
        getHorseData();
    });

}





function getHorseData() {
    // var requestFilters = '{"filter":{"eventTypeIds": [' + eventId + '],"marketCountries":["GB", "IE"],"marketTypeCodes":["WIN"],"marketStartTime":{"from":"'+jsonDate+'"}},"sort":"FIRST_TO_START","maxResults":"1000","marketProjection":["RUNNER_DESCRIPTION", "RUNNER_METADATA", "MARKET_DESCRIPTION", "EVENT", "COMPETITION"]}}';

// var invocation = session.listCompetitions({filter: {marketCountries:["GB", "IE"]}}, function(err,res) {
    var what = ["RUNNER_DESCRIPTION", "RUNNER_METADATA", "MARKET_DESCRIPTION", "EVENT", "COMPETITION"];


    var invocation = session.listMarketCatalogue({filter: {
        eventTypeIds: ['7'],
        marketCountries:["GB", "IE"]},
        marketStartTime:['StartsAfter: '+jsonDate],
        marketProjection:what,
        maxResults:"100"}, function(err,res) {
        // console.log(res);
        if(err) {
            console.log('listCountries failed');
        } else {
            for(var index in res.response.result) {
                var item = res.response.result[index];


                if(item['marketName'].includes("f") || item['marketName'].includes("m")
                    &&  !item['marketName'].includes("Placed") &&  !item['marketName'].includes("TBP")
                    &&  !item['marketName'].includes(" v ")){
                    console.log('---------------------------')


                    var date = item.event.openDate.split('T')[0];
                    var time = item.event.openDate.split('T')[1];
                    time = time.substring(0, time.length - 8);


                    console.log(item['marketName'])
                    // console.log(item.runners)
                    for(var runNum=0; runNum<100; runNum++){
                        if (item.runners[runNum]==null) {break};
                        console.log('----------------------------------')

                        var tempHorse ={
                            HorseEvent: item.event.id,
                            HorseName: item.runners[runNum]['metadata']['runnerId'],
                            HorseName: item.runners[runNum]['runnerName'],
                            HorseHadicap:  (item.runners[runNum]['handicap']),
                            HorseAge: (item.runners[runNum]['metadata']['AGE']),
                            HorseForm: (item.runners[runNum]['metadata']['FORM']),
                            HorseWeight: (item.runners[runNum]['metadata']['WEIGHT_VALUE'] +" "+item.runners[runNum]['metadata']['WEIGHT_UNITS']  ),
                            HorseJockey: (item.runners[runNum]['metadata']['JOCKEY_NAME']),
                            HorseTrainer: (item.runners[runNum]['metadata']['TRAINER_NAME']),
                            HorseSexType: (item.runners[runNum]['metadata']['SEX_TYPE']),
                            HorseOdds: (item.runners[runNum]['metadata']['FORECASTPRICE_NUMERATOR'] + "/" +item.runners[runNum]['metadata']['FORECASTPRICE_DENOMINATOR']),
                            HorseBred: (item.runners[runNum]['metadata']['BRED']),
                            HorseClothNumber: (item.runners[runNum]['metadata']['CLOTH_NUMBER']),
                            HorseStallDraw:(item.runners[runNum]['metadata']['STALL_DRAW']),
                            HorseOR:(item.runners[runNum]['metadata']['OFFICIAL_RATING']),
                            HorseDaySinceLastRun: (item.runners[runNum]['metadata']['DAYS_SINCE_LAST_RUN']),
                            HorseJockeyClaim: (item.runners[runNum]['metadata']['JOCKEY_CLAIM']),
                            HorseWearing: (item.runners[runNum]['metadata']['WEARING'])
                        };
                        var tempEvent ={
                            EventId: item.event.id,
                            EventName: item.event.name,
                            Eventcountry: item.event.countryCode,
                            Eventvenue: item.event.venue,
                            EventDate: date,
                            EventTime: time

                        };
                        tempEventArray.push(tempEvent);
                        tempHorseArray.push(tempHorse);

                    }

                }

            }
// "event":{"id":"28161455","name":"Kemp 22nd Mar","countryCode":"GB","timezone":"Europe/London","venue":"Kempton","openDate":"2017-03-22T17:45:00.000Z"},



        }
        // }

        console.log(tempHorseArray);

    });
}



function saveInfo(dataArray) {
    // console.log(dataArray)
    dataArray = JSON.stringify(dataArray);
    fs.writeFile('SHITTTT.json', dataArray);
}


function logout(){
    session.logout(function(err) {
        console.log(err ? "Logout failed: " + err : "Logout OK");
    });
}

