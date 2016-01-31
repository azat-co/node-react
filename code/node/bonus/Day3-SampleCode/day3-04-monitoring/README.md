=================
profiler-demo-app
=================

Use this demo app to showcase CPU and Heap profiling using StrongOps 
hosted service or On-premises monitoring. 
The profiler demo app is a simple loopback application. 
It includes a load generator script which makes 2 post requests. 
The first POST request '/documents' creates multiple instances of the 
document object and burns CPU. Use the CPU profiler to see the CPU usage. 
The second POST request '/documents/content' increases the 'Document' 
count. Use the HEAP Profiler to see the increased object count.  

#### Install StrongLoop software

    $ npm install -g strongloop

#### Install node_modules

    $ npm install

#### On-premises monitoring

Run the app.

    $ slc run --cluster 2

    
Run the load generator script.

    $ node loadtest.js
    
You can collect CPU and Heap profiling data using the slc runctl 
command and Google Chrome tools. 
See [slc runctl](http://docs.strongloop.com/display/SLC/slc+runctl) for more details.

#### StrongOps hosted

* Go to [register](http://strongloop.com/register) and enter your email address.
* You'll immediately get an email from StrongLoop with a link.
* Go to the URL in the email, choose a password, and agree to the 
Terms of Use.  Enter additional account details if you want to.

Generate StrongOps configuration.

    $ slc strongops

Run the app.

    $ slc run --cluster 2

Run the load generator script.

    $ node loadtest.js

##### CPU Profiler

Click on the CPU Profiler tab. Select the app named profiler-app and 
start the profiler. Run it for around 6-10 seconds and you should be able 
to see the CPU profiler chart. This will slow down the 
CPU usage. 
See [CPU Profiling](http://docs.strongloop.com/display/SLA/CPU+profiling) 
for more details on CPU profiling.

##### Heap Profiler 

Click on the Heap Profiler tab. Select the app named profiler-app and 
start the profiler. Leave it running for a while and you should be able 
to see the object count increasing.
See [Heap](http://docs.strongloop.com/display/SLA/Heap+memory+profiling)
Memory Profiling for more details on heap  profiling data.

Note: Do not leave the app running for too long. Kill the app, once you 
generate the graphs. The app is meant to leak objects and consumes a lot of CPU.

