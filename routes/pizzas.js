var Pizza = require('../models/pizzas');
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
    // Use the Pizza model to find all pizzas
    Pizza.find(function(err, pizzas) {
        if (err)
            res.send(err);
        else
            res.json(pizzas);
    });
}

router.findOne = function(req, res) {

    // Use the Pizza model to find a single pizza
    Pizza.find({ "_id" : req.params.id },function(err, pizza) {
        if (err)
            res.json({ message: 'Pizza NOT Found!', errmsg : err } );
        else
            res.json(pizza);
    });
}

router.addPizza = function(req, res) {

    var pizza = new Pizza();

    pizza.name = req.body.name;
    pizza.price = req.body.price;
    pizza.description = req.body.description;
    pizza.calories = req.body.calories;

    console.log('Adding pizza: ' + JSON.stringify(pizza));

    // Save the pizza and check for errors
    pizza.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Pizza Added!', data: pizza });
    });
}

router.deletePizza = function(req, res) {

    Pizza.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Pizza Deleted!'});
    });
}


module.exports = router;