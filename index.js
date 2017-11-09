var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) { res.send('Hello world!'); });

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