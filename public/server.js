var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
    /////////////////////////////////////
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbaum'); // dbaum name db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

var kittySchema = mongoose.Schema({
    name: String,
    surname: String,
    age: Number
});

/////// ต้อง เติ่ม S =>  ชื่อ ืี่อยู่ใน database collections
var collections = mongoose.model('collections', kittySchema);
collections.find(function(err, collection) {
        if (err) return console.error(err);
        //console.log(collection);
    })
    /////////////////////////////////////////
router.post('/save', jsonParser, function(req, res) {
        var full = {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age
        }
        var fluffy = new collections(full);
        fluffy.save(function(err, collection) {
            if (err) return res.send(err);
        });
         res.send(full);
    })
    ////////////////////////
router.get('/findall', function(req, res) {

        collections.find(function(err, collections) {
            if (err) return console.error(err);
            // console.log(collections);
            res.send(collections);
        })
    })
    ////////////////////////
router.get('/findall/:_id', function(req, res) {
        //console.log(req.params._id);
        var data = { _id: req.params._id }
        collections.find(data, function(err, collections) {
            if (err) return console.error(err);
            // console.log(collections);
            res.send(collections);
        })
    })
    ////////////////////////
router.delete('/delete/:id', jsonParser, function(req, res) {
        // var data = {_id:req.params.id}
        collections.remove({ _id: req.params.id }, function(err, collections) {
            if (err) return console.error(err);
            // console.log(collections);
            res.send(collections);
        })
    })
    ////////////////////////
router.put('/putupdate', jsonParser, function(req, res) {
    var data = { _id: req.body._id, name: req.body.name, surname: req.body.surname, age: req.body.age }
    console.log(data);
    collections.update({ _id: req.body._id }, data, function(err, collections) {
        if (err) return console.error(err);
        // console.log(collections);
        res.send(collections);
    })
})

module.exports = router