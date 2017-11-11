var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function(req, res, next) { res.send('Hello world!'); });

app.get('/send', function(req, res, next) { 

	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('demo/playb.html', function (err, data){
		if(err) {
			throw error;
		}
		else {
			res.write(data);
		}

		res.end();

	});

});

app.get('/recieve', function(req, res, next) { 
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('demo/playc.html', function (err, data){
		if(err) {
			throw error;
		}
		else {
			res.write(data);
		}

		res.end();

	});

});

var server = app.listen(9000);

var options = {
	debug: true
}
var connServer = ExpressPeerServer(server, options);
app.use('/officeConn', connServer);

connServer.on('connection', function(id) {
	console.log('New connection with '+id)
});

connServer.on('disconnect', function (id) {
	console.log('disconnect with id ' + id);
});