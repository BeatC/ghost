var bridge = require('./node-casper.js'),
	cheerio = require('cheerio');



exports.run = function(query, item, next) {
	bridge.getPage(query, item, function(err, page) {
		var $ = cheerio.load(page);
		exports.resultJSON = getJSON($);
		next(exports.resultJSON);
	});
}

var getJSON = function($) {

	var result = [];

	exports.headers = [];					// Read all headers from the first row
	$('thead tr th').each(function(i, elem) {
		exports.headers.push($(this).text());
	});

	exports.descriptions = [];				// Next rows represent descriptions
	$('tbody tr').each(function(i, elem) {
		var row = cheerio.load($(this).html().toString());
		exports.descriptions[i] = [];		// every element in array represents one row from the table
		row('td').each(function(j, elem) {
			exports.descriptions[i].push($(this).text());
		});
	});

	result = exports.descriptions.map(function(arr) {
		var element = {};
		for(var j = 0; j < exports.headers.length; j++)
			element[exports.headers[j]] = arr[j];

		return element;
	});

	return JSON.stringify(result);
};