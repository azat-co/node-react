// Description: A basic HTTP server with Node.js

var http = require('http')

server = http.createServer(function (request, response) {
  console.log('url: ', request.url)
  console.log('method: ', request.method)
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('Hello World\n')
})

server.listen(1337, '127.0.0.1', function(){
  console.log('Server running at http://127.0.0.1:1337/')
})
