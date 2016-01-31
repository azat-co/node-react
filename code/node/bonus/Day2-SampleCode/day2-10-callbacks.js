function zeeFunction(arg1, arg2, callback) {
	var aNumber = Math.ceil(Math.random() *
		(arg1 - arg2) + arg2);
	callback(aNumber);
}

zeeFunction(5, 15, function(num) {
	console.log("callback called! " + num);
});