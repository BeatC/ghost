var	casper = require('casper').create({
	clientScripts: ['./bower_components/jquery/dist/jquery.min.js'],
		pageSettings: {
			loadImages: false
		},
	}),
	query = "New York NY",
	item = 3;

casper.start("http://www.zillow.com");

if(casper.cli.args[0])
	query = casper.cli.args[0];

if(casper.cli.args[1])
	item = casper.cli.args[1];

casper.thenEvaluate(function(query) {

	$('#citystatezip').attr('value', query);

}, query);

casper.thenClick(".zsg-search-button");

casper.wait(5000)				// Wait for page loading

casper.thenEvaluate(function(query) {
	$('#terse-search-results article:nth-child(2)').toggleClass('chosen');
	console.log($('#terse-search-results:nth-child(2)').attr('class'));
});

casper.thenClick(".chosen");

casper.wait(5000);                            // Wait for AJAX-request												

casper.run(function() {
	this.echo(this.getHTML('.zsg-table'));
	this.exit(0);
});