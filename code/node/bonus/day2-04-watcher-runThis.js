var fs = require('fs');
var fileMessage = 'Hello Node.js JavaScript Coders, via synchronous!';
var path = '';  // Current working directory.
var fileName = 'message.txt';
var fullFilePath = path + fileName;

fs.watch('.', function (event, filename) {
  console.log('event is ' + event);
  if (filename) {
    console.log('filename provided: ' + filename);
  } else {
    console.log('filename not provided');
  }
});

for (var i = 0; i < 10; i++){
	var workingDir = 'newdir' + i;
	var fullPathAndFile = workingDir + '/thisFile.txt'
	fs.mkdir(workingDir);
	fs.writeFile(fullPathAndFile);
	fs.unlink(fullPathAndFile);
	fs.unlink(workingDir);
}
