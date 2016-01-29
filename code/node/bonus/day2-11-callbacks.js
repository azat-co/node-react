// define our function with the callback argument
function zeeFunction(arg1, arg2, callback) {
	// this generates a random number between
	// arg1 and arg2
	var aNumber = Math.ceil(Math.random() *
		(arg1 - arg2) + arg2);
	// then we're done, so we'll call the callback and
	// pass our result
	callback(aNumber);
}
// call the function
zeeFunction(5, 15, function(num) {
	// this anonymous function will run when the
	// callback is called
	console.log("callback called! " + num);
});