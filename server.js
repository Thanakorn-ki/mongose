var express = require('express');
var app = express();
app.use(express.static('public'));

var server = require('./public/server.js')
app.use('/',server)

var server = app.listen(8081,function (){})