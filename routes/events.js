var Event = require('../models/events');
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

    Event.find(function(err, event) {
        if (err)

        res.send(err);
        else
        {
            console.log('ERROR');

            res.json(event);
    }
    });
}

router.findOne = function(req, res) {

    // Use the Event model to find a single event
    Event.find({ "_id" : req.params.id },function(err, event) {
        if (err)
            res.json({ message: 'Events NOT Found!', errmsg : err } );
        else
            res.json(event);
    });
}

router.addEvent = function(req, res) {

    var event = new Event();

    event.name = req.body.name;
    event.time = req.body.time;
    event.location = req.body.location;

    console.log('Adding event: ' + JSON.stringify(event));

    // Save the event and check for errors
    event.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Event Added!', data: event });
    });
}

router.deleteEvent = function(req, res) {

    Event.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Event Deleted!'});
    });
}


module.exports = router;