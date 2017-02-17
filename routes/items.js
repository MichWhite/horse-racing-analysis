var Item = require('../models/items');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://admin:admin@ds117909.mlab.com:17909/pizzaorder');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

router.findAll = function(req, res) {
    // Use the Item model to find all items
    Item.find(function(err, items) {
        if (err)
            res.send(err);
        else
            res.json(items);
    });
}

router.findOne = function(req, res) {

    // Use the Item model to find a single item
    Item.find({ "_id" : req.params.id },function(err, item) {
        if (err)
            res.json({ message: 'Item NOT Found!', errmsg : err } );
        else
            res.json(item);
    });
}

router.addItem = function(req, res) {

    var item = new Item();

    item.name = req.body.name;
    item.price = req.body.price;
    item.description = req.body.description;
    item.calories = req.body.calories;
    item.type = req.body.type;

    console.log('Adding item: ' + JSON.stringify(item));

    // Save the item and check for errors
    item.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Item Added!', data: item });
    });
}

router.deleteItem = function(req, res) {

    Item.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Item Deleted!'});
    });
}

router.incrementUpvotes = function(req, res) {

    Item.findById(req.params.id, function(err,item) {
        if (err)
            res.send(err);
        else {
            item.upvotes += 1;
            item.save(function (err) {
                if (err)
                    res.send(err);
                else
                res.json({ message: 'Item Upvoted!', data: item });
            });
        }
    });
}

module.exports = router;