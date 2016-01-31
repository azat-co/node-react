var fileMessage = 'Hello Node.js JavaScript Coders, via synchronous!';
var fs = require('fs');
var path = '';  // Current working directory.
var fileName = 'message.txt';
var fullFilePath = path + fileName;

if (fs.existsSync(fullFilePath)) {
    fs.unlinkSync(fullFilePath);
}
var writeResult = fs.writeFileSync('message.txt', fileMessage);
var readResult = fs.readFileSync('message.txt', 'utf8');

console.log("Result " + readResult);