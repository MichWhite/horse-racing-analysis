/**
 * Created by michealin on 3/14/2017.
 */
var schedule = require('node-schedule');

var j = schedule.scheduleJob('05 * * * *', function(){
    console.log('retrieving Data');
});