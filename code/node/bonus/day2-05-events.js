var events = require('events');
var http = require('http');
var counter = 0;

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});

server.on('connection', function (stream) {
  counter++;
  console.log('The ' + counter + ' client has connected!');
});
