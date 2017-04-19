var mongoose = require('mongoose');

var ResultsSchema = new mongoose.Schema({


    EventID: mongoose.Schema.Types.ObjectId,
    Result: [
        {
            Horse: mongoose.Schema.Types.ObjectId,
            Position: String
        }
        ]
});
module.exports = mongoose.model('results', ResultsSchema);