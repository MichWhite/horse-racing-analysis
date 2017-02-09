/**
 * Created by michealin on 2/9/2017.
 */
var items = require('../models/items');
var express = require('express');
var router = express.Router();

router.findAll = function(req, res) {
    res.json(items);
}

router.findOne = function(req, res) {

    var item = getByValue(items,req.params.id);
    if(item != null)
        res.json(item);
    else
        res.json({ message: 'item NOT Found!'});
}

    function getByValue(arr, id) {

        var result  = arr.filter(function(o){return o.id == id;} );

        return result ? result[0] : null; // or undefined
}

router.addItem = function(req, res) {
    //Add a new item to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id

    var currentSize = items.length;
    items.push({"id":id,"name": req.body.name, "price": req.body.price,"description":req.body.description, "calories": req.body.calories, "type":req.body.type});

    if((currentSize + 1) == items.length)
        res.json({ message: 'Item Added!'});
    else
        res.json({ message: 'Item NOT Added!'});
}

module.exports = router;