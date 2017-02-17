var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    calories: Number,
    type: String});
module.exports = mongoose.model('Item', ItemSchema);