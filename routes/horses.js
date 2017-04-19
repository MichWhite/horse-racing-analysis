var Horse = require('../models/horses');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://admin:admin@dbh54.mlab.com:27547/horseracing');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});


router.findAll = function(req, res) {

    Horse.find(function(err, horses) {

        if (err)
            res.send(err);
        else
            res.json(horses);
    });

}

router.findEvent = function(req, res) {

    // Use the Horse model to find a single horses
    Horse.find({ "EventId" : req.params.EventId },function(err, horses) {
        if (err)
            res.json({ message: 'Horses NOT Found!', errmsg : err } );
        else
            res.json(horses);
    });
}


router.findOne = function(req, res) {
    console.log(req.params);

    Horse.find({ "_id" : req.params.id },function(err, horses){
        if (err)
            res.json({ message: 'Events NOT Found!', errmsg : err } );
        else
            res.json(horses);
    });
}



module.exports = router;