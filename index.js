var express = require("express"),
    url = require("url"),
	validUrl = require('valid-url');

var app = express();

var urls = {},
	next = 1001;

function insertUrl(newUrl) {
	var short = "https://url-shortener-lafisrap.c9users.io/"+next;
	urls[next++] = newUrl;
	return short;
}

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get( "/new/*", function(req, res) {
	var path = url.parse(req.url, true, true).path,
		newUrl = path.match(/new\/([\w\W]+)$/);

	if( newUrl && validUrl.isUri(newUrl[1]) ) {
		var inserted = insertUrl(newUrl[1]);

		res.json({targetUri: newUrl[1], shortUri: inserted});	
	} else {
		res.json({error: "No valid URI specified."});
	}
});

app.get( "/*", function(req, res) {
	var path = url.parse(req.url, true).path.substr( 1 );

	if( urls[path] ) res.redirect(urls[path]);
	else res.json({error: "No valid short Uri found."});
});

app.listen(8080, function() {
    console.log("App is listening to port 8080");
});
