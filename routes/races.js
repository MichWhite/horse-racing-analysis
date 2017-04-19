var Race = require('../models/races');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var clone = require('clone');


mongoose.connect('mongodb://admin:admin@dbh54.mlab.com:27547/horseracing');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});


router.findAll = function(req, res) {

    Race.find(function(err, races) {

        if (err)
            res.send(err);
        else
            res.json(races);
    });

  }

router.findOne = function(req, res) {

    // Use the Race model to find a single races
    Race.find({ "EventId" : req.params.id },function(err, races) {
        if (err)
            res.json({ message: 'Races NOT Found!', errmsg : err } );
        else
            res.json(races);
    });
}

router.addRace = function(req, res) {

    var races = new Race();

    races.runnerNo = req.body.runnerNo;
    races.RunnerName = req.body.RunnerName;
    races.Odds = req.body.Odds;
    races.form = req.body.form;
    races.Age = req.body.Age;
    races.Weight = req.body.Weight;
    races.Trainer = req.body.Trainer;
    races.Jockey = req.body.Jockey;
    races.Score = req.body.Score;

    console.log('Adding races: ' + JSON.stringify(races));

    // Save the races and check for errors
    races.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Race Added!', data: races });
    });
}

router.deleteRace = function(req, res) {

    Race.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Race Deleted!'});
    });
}


module.exports = router;


