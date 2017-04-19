var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
    EventName:String ,
    EventTime: String,
    EventDate: String,
    EventLocation: String,
    EventGoing: String,
    EventNoRunners: Number,
    EventAgeCategory: String,
    EventClass: String,
    EventLength: String

});
module.exports = mongoose.model('events', EventsSchema);