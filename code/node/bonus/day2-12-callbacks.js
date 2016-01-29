// The Asyncronous Method
function addToThis(x, zeeCallback) {
  if(typeof x !== 'number') {
    zeeCallback( new Error('First argument is not a number') );
    return;
  }
  var result = x + 20;
  setTimeout(function() {
    zeeCallback(null, result);
  }, 500);
}

// The Callback
function zeeCallback(err, data) {
  if(err) {
    console.log(err);
    return;
  }
  console.log(data);
}

// Examples
addToThis(2, zeeCallback);
addToThis(-2, zeeCallback);
addToThis('10', zeeCallback);
