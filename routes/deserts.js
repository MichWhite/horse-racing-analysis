var Desert = require('../models/deserts');
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
    // Use the Desert model to find all deserts
    Desert.find(function(err, deserts) {
        if (err)
            res.send(err);
        else
            res.json(deserts);
    });
}

router.findOne = function(req, res) {

    // Use the Desert model to find a single desert
    Desert.find({ "_id" : req.params.id },function(err, desert) {
        if (err)
            res.json({ message: 'Desert NOT Found!', errmsg : err } );
        else
            res.json(desert);
    });
}

router.addDesert = function(req, res) {

    var desert = new Desert();

    desert.name = req.body.name;
    desert.price = req.body.price;
    desert.calories = req.body.calories;

    console.log('Adding desert: ' + JSON.stringify(desert));

    // Save the desert and check for errors
    desert.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Desert Added!', data: desert });
    });
}

router.deleteDesert = function(req, res) {

    Desert.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Desert Deleted!'});
    });
}


module.exports = router;