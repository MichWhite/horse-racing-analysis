/**
 * Created by michealin on 4/11/2017.
 */
var Historical = require('../models/historical');
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

    Historical.find(function(err, historical) {

        if (err)
            res.send(err);
        else
            res.json(historical);
    });

}



module.exports = router;