var mongoose = require('mongoose');

var PizzaSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    calories: Number
});
module.exports = mongoose.model('Pizza', PizzaSchema);