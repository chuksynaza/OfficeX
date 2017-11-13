var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var fs = require('fs');
var http   = require('http');
var https  = require('https');
var os     = require('os');
var ifaces = os.networkInterfaces();

var privateKey  = fs.readFileSync('serve/key.pem', 'utf8');
var certificate = fs.readFileSync('serve/cert.pem', 'utf8');

var sslCredentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(sslCredentials, app);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res, next) { res.send('Hello world!'); });

/*app.get('/send', function(req, res, next) { 

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

});*/

var host = "127.0.0.1";
var port = 9001;
var Sport = 9000;
var path = '/officeConn';
console.log(ifaces);

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }
        
        console.log("");
        console.log("Welcome to the Chat Sandbox");
        console.log("");
        console.log("Test the chat interface from this device at : ", "https://localhost:8443");
        console.log("");
        console.log("And access the chat sandbox from another device through LAN using any of the IPS:");
        console.log("Important: Node.js needs to accept inbound connections through the Host Firewall");
        console.log("");

        if (alias >= 1) {
            console.log("Multiple ipv4 addreses were found ... ");
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, "https://"+ iface.address + ":8443");
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, "https://"+ iface.address + ":8443");
        }

        ++alias;
    });
});

app.get('/send', function(req, res, next) { 


	res.render('demo/play', {
	        user: 'collins',
	        host: host,
	        port: Sport,
	        path: path
	    });
});

app.get('/recieve', function(req, res, next) { 


	res.render('demo/play', {
	        user: 'derrick',
	        host: host,
	        port: Sport,
	        path: path
	    });
});



var options = {
	debug: true,
	ssl: sslCredentials
}
var connServer = ExpressPeerServer(httpsServer, options);
app.use(path, connServer);

connServer.on('connection', function(id) {
	console.log('New connection with '+id)

});

connServer.on('disconnect', function (id) {
	console.log('disconnect with id ' + id);
});



// Allow access from all the devices of the network (as long as connections are allowed by the firewall)
var LANAccess = "0.0.0.0";
// For http
httpServer.listen(port, LANAccess);
// For https
httpsServer.listen(Sport, LANAccess);
