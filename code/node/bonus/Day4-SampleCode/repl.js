var repl = require('repl')
var net = require('net')

module.exports = net.createServer(function(socket) {
  repl.start('azat' + "> ", socket).context.socket = socket;
}).listen(1313);