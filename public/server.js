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

/////// ต้อง เติ่ม S =>  collections
var collections = mongoose.model('collections', kittySchema);
collections.find(function(err, collection) {
    if (err) return console.error(err);
    console.log(collection);
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
            if (err) return console.error(err);

        });
        res.send(full);
        console.log('TestPOST-OK')
    })
    ////////////////////////
router.get('/findall', function(req, res) {

        collections.find(function(err, collections) {
            if (err) return console.error(err);
            console.log(collections);
            res.send(collections);
        })


    })
    //////////



module.exports = router
