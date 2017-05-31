// Requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// Globals
var port = 9001;

// Uses
app.use(express.static('public')); // for relative URLs
app.use(bodyParser.urlencoded({
	extended: true
}));

// Spin up server
app.listen(port, function() {
	console.log('server up on port:', port);
});


// Base URL
app.get('/', function(req, res) {
	console.log('in base URL');
	res.sendFile(path.resolve('views/index.html'));
});

// get route
app.get('/images', function(req, res) {
	console.log('get hit to /images');
	res.send('quack');
});

// post route
app.get('/images', function(req, res) {
	console.log('post hit to /images:', req.body);
	res.send('ribbit');
});
