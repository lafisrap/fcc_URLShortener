var express = require("express"),
    useragent = require("useragent");

var app = express();

app.get( "*", function(req, res) {
	var h = req.headers,
		userAgent = h["user-agent"].match(/\(([^\)]*)\)/)[0],
		language = h["accept-language"];
	console.log(req.headers);

    res.json({
		software: userAgent.substr(1,userAgent.length-2),
		language: language.substr(0, language.search(",")),
		ipAddress: h["x-forwarded-for"]
	});
});

app.listen(8080, function() {
    console.log("App is listening to port 8080");
});
