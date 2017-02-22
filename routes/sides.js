var Side = require('../models/sides');
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
    // Use the Side model to find all sides
    Side.find(function(err, sides) {
        if (err)
            res.send(err);
        else
            res.json(sides);
    });
}

router.findOne = function(req, res) {

    // Use the Side model to find a single side
    Side.find({ "_id" : req.params.id },function(err, side) {
        if (err)
            res.json({ message: 'Side NOT Found!', errmsg : err } );
        else
            res.json(side);
    });
}

router.addSide = function(req, res) {

    var side = new Side();

    side.name = req.body.name;
    side.price = req.body.price;
    side.calories = req.body.calories;

    console.log('Adding side: ' + JSON.stringify(side));

    // Save the side and check for errors
    side.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Side Added!', data: side });
    });
}

router.deleteSide = function(req, res) {

    Side.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Side Deleted!'});
    });
}


module.exports = router;