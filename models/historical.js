var mongoose = require('mongoose');

var HistoricalsSchema = new mongoose.Schema({
    Date: String,
    Position: String,
    RunnerName: String,
    Weight: String,
    Course: String,
    Distance: String,
    Going: String,
    Class: String,
    Trainer: String,
    Jockey: String,
    Winner: String,
    "Starting Price": String
});

HistoricalsSchema.set('collection', 'historical');

module.exports = mongoose.model('historical', HistoricalsSchema);