// Requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

// Globals
var port = 9001;
var config = {
	database: 'omegapics',
	host: 'localhost',
	port: 5432, // default port for localhost portgres databases
	max: 12
};

var pool = new pg.Pool(config);

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
	// connect to db
	pool.connect(function(err, connection, done) {
		if (err) {
			console.log('error connecting to db');
			done();
			res.send('totally vomitsnotfartburp');
		} // end error
		else {
			console.log('connected to db');
			var allImages = [];
			// create our query string
			// tell db to run query
			// hold result set in variable
			var resultSet = connection.query('SELECT * FROM pictable');
			resultSet.on('row', function(row) {
				// loop through result set and push each row into an array
				allImages.push(row);
			});
			resultSet.on('end', function() {
				// on last row (aka end) res.send the info and close connection
				done();
				res.send('connection established');
			});
		}
	});
	res.send('quack');
});

// post route
app.get('/images', function(req, res) {
	console.log('post hit to /images:', req.body);
	res.send('ribbit');
});
