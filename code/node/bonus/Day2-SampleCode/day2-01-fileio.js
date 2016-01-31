var fileMessage = 'Hello Node.js JavaScript Coders!';
var fs = require('fs');
var path = '';  // Current working directory.
var fileName = 'message.txt';
var fullFilePath = path + fileName;

if (fs.existsSync(fullFilePath)) {
    fs.unlink(fullFilePath, function (err) {
      if (err) response.errors.push("Erorr : " + err);
      console.log('successfully deleted : '+ fullFilePath );
    });
}

fs.writeFile('message.txt', fileMessage, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});

fs.readFile('message.txt', function (err, data) {
  if (err) throw err;
  console.log(data);
});