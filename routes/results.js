var result = require('../models/results');
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

    result.find(function(err, result) {
        if (err)

        res.send(err);
        else
        {
            console.log('ERROR');

            res.json(result);
    }
    });
}

router.findOne = function(req, res) {

    // Use the result model to find a single result
    result.find({ "_id" : req.params.id },function(err, result) {
        if (err)
            res.json({ message: 'results NOT Found!', errmsg : err } );
        else
            res.json(result);
    });
}


module.exports = router;