var Job = function(){}
require('util').inherits(Job, require('events').EventEmitter)
job = new Job()
job.on('done', function(timeDone){
  console.log('Job was pronounced done at', timeDone);
});
job.emit('done', new Date());
job.removeAllListeners();