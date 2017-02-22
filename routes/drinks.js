var Drink = require('../models/drinks');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://admin:admin@ds117909.mlab.com:17909/pizzatorder');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

router.findAll = function(req, res) {
    // Use the Drink model to find all drinks
    Drink.find(function(err, drinks) {
        if (err)
            res.send(err);
        else
            res.json(drinks);
    });
}

router.findOne = function(req, res) {

    // Use the Drink model to find a single drink
    Drink.find({ "_id" : req.params.id },function(err, drink) {
        if (err)
            res.json({ message: 'Drink NOT Found!', errmsg : err } );
        else
            res.json(drink);
    });
}

router.addDrink = function(req, res) {

    var drink = new Drink();

    drink.name = req.body.name;
    drink.price = req.body.price;
    drink.calories = req.body.calories;

    console.log('Adding drink: ' + JSON.stringify(drink));

    // Save the drink and check for errors
    drink.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Drink Added!', data: drink });
    });
}

router.deleteDrink = function(req, res) {

    Drink.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Drink Deleted!'});
    });
}


module.exports = router;