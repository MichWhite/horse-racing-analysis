/**
 * Created by michealin on 3/22/2017.
 */
var mongoose = require('mongoose');

var RacesSchema = new mongoose.Schema({
    runnerNo: Number,
    RunnerName: String,
    Odds: String,
    form: String,
    Age: String,
    Weight: String,
    Trainer: String,
    Jockey: String,
    Score: Number

});

RacesSchema.set('collection', 'dummyData');
module.exports = mongoose.model('dummyData', RacesSchema);
