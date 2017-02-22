/**
 * Created by michealin on 2/22/2017.
 */
var mongoose = require('mongoose');

var DesertsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    calories: Number
});
module.exports = mongoose.model('Deserts', DesertsSchema);