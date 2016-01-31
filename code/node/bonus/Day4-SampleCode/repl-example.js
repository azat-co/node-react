var repl = require('./repl2');
var http = require('http'),
 util = require('util'),
  options = { name: 'azat' };

app = {a: 1};

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(app) + '\n');
}).listen(3000, '127.0.0.1');

