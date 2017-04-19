// /**
//  * Created by michealin on 3/30/2017.
//*/
var mongoose = require('mongoose');

var HorsesSchema = new mongoose.Schema({
    EventId: String,
    RunnerNo: Number,
    HorseName: String,
    HorseForm: String,
    HorseAge: Number,
    HorseWeiht: String,
    Trainer: String,
    Jockey: String,
    OR: Number
});
module.exports = mongoose.model('horses', HorsesSchema);