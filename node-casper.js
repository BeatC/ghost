var exec = require('child_process').exec;

exports.getPage = function(query, item, next) {							//outer method for getting page
	exec('casperjs grab.js "' + query + '" ' + item , function(error, stdout, stdin) {
			exports.page = stdout.toString();
			next(error, exports.page);		// Invoking next callack in the queue
	});	
}

