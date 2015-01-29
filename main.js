var express = require('express'),
	parser = require('./parser.js'),
	app = express(),
	server;

app.disable('x-powered-by');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/search', function(req, res) {
	parser.run(req.query.query, req.query.item, function(result) {
		var wrapper = {
			"data": result
		}

		res.send(wrapper);
	});
});

server = app.listen(1337, function() {
	console.log('Listening on port 1337');
});
