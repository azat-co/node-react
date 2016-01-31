var cluster = require('cluster');
var control = require('strong-cluster-control');
var express = require('express');
var app = express();
var stats = {};

control.start({
    size: control.CPUS
}).on('error', function(er) {
    console.error(er);
});

if(cluster.isWorker) {
  var port = 3000;
  stats[cluster.worker.process.pid] = 0;
  console.log('worker (%s) is now listening to http://localhost:%s',
    cluster.worker.process.pid, port);
  var app = express();
  app.get('*', function(req, res) {
    stats[cluster.worker.process.pid] += 1;
    var l ='cluser '
      + cluster.worker.process.pid
      + ' responded \n';
    console.log(l);
    res.status(200).send(l);
  })
  app.listen(port);
}

process.on('SIGINT', function(){
  console.log(stats)
  console.log('Execute "$ killall node" to terminate')
})