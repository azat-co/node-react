footer: © Node Program, 2016
slidenumbers: true

# Node Program
## Node Basics

![inline 70%](images/np-logo120.png)

Node.js version: 5.1
Last updated: Jan 2016

---

### Node.js

![left](images/ryan.png)

> "Everything is a callback...  in Node everything is non-blocking and so it doesn't allow you to just sit there and then return the response. "
-- Ryan Dahl <http://www.infoq.com/interviews/node-ryan-dahl>



^Discuss the basic server in node.js, how the request and response work, what libraries they're from and then dive into code.

---

### Node Language

Node is not JavaScript, but both JavaScript and Node are ECMAScript.

^There are discrepancies between browser JS and Node.

---

### `global` Object

The global object is similar to window object in the browser JavaScript.

```js
global.require() === require()
global.process === process
global.console === console
```

---

### `process` Object

In Node, interaction with the current Node process takes place
via the `process` object.

As the `process` object is a global, it is accessible from anywhere
in the application source code.

Note: it is an instance of EventEmitter - logic can therefore be applied
to the process object via callbacks assigned to specific events.

---

### Environment Variables

Environment variables can be accessed via the `env` attribute:

```
console.log(process.env);

{ SHELL: '/bin/bash',
  USER: 'jordan',
  HOME: '/home/jordan',
  ...
}
```

---

### Command-Line Arguments

Shell commands accept arguments to alter their behaviour:

```
$ echo "Hello World!" // "Hello World" is the argument here
```

Node makes these arguments accessible via `process.argv`

---

### Command-Line Options

The `argv` property is an array.

The first two elements are 'node' and the application's name:

```
$ node app.js arg1 arg2 arg3=val3

/*
    process.argv => [
        'node', 'app.js', 'arg1',
        'arg2', 'arg3=val3'
    ]
*/
```

---

### Exiting a Process

To exit a process, use the `exit` function

```
process.exit();
```

---

### Exiting with Errors

Exit codes can also be specified

```
// this process exits successfully
process.exit(0);

// this process failed
process.exit(1);

// this process failed with a different code
process.exit(127);
```

---

### Exiting with Errors

Note:

* Different failure codes can be used to differentiate types of
failure
* Knowing how an application failed allows the developers the means
to program an appropriate response

---

### Child Processes

A child process is a process created by another process.

To have Node applications run other processes, use the `child_process`
module.

---

### Execute a Process

The `exec` function runs a shell command, and invokes a callback
with references to the child process' standard output and error

```js
var cp = require('child_process');
var ps = cp.exec('ps aux', function (err, stdout, stderr) {
    console.log('STDOUT: ', stdout); // data written to stdout
    console.log('STDERR: ', stderr); // data written to stderr
});
```

^`stderr` does not always show only errors, as there are programs that use it to output additional data.

---

### Exec Callback

The `exec` callback also provides an error object as its first argument,
which can be analyzed in the event process execution fails.

```js
var ps = cp.exec('nonexistant-command', function (err, stdout, stderr) {
    if (err) {
        // stack trace
        console.log(err.stack);

        // exit code
        console.log(err.code);
    }
});
```

---

### Spawn a Process

To access a child process' streams, use the `spawn` function

```js
var spawn = require('child_process').spawn;
var echo  = spawn('echo', ['Manage child processes in Node']);
var tee   = spawn('tee', ['spawn.txt']);

echo.stdout.on('data', function (data) {
  tee.stdin.write(data);
});

echo.stderr.on('data', function (data) {
  console.log('echo stderr: ' + data);
});

echo.on('close', function (code) {
  tee.stdin.end();
});
```

---


### Notes on Child Process

* `spawn` returns an instance of the `ChildProcess` class
* `ChildProcess` inherits from `EventEmitter` and is a private class
* to write to a spawned process, use its stdin's `write` function
* close the input stream to allow the spawned process to continue its
execution

---

# Modules

---

### Modules in Browser

Don't exist natively until ES6, i.e., no built-in module support!

---

### Modules in Browser Workarounds

* `<script>`
* CommonJS
* AMD (requirejs)
* ES6

---

### Module Loaders in Browser

* SystemJS
* RequireJS
* Browserify
* es6-module-loader

More info: <http://mzl.la/1Ieu8zM> and <http://mzl.la/1Ieu7vz>

---

### Modules in Node

Built-in modules with `require` a CommonJS notatioin! :gift_heart:

Node Require Example:

```js
var express = require('express');
var app = express();
```

^Contract Specification for modules
Module Context:
In a module, there is a free variable "require", that is a function.
The "require" function accepts a module identifier.
"require" returns the exported API of the foreign module.
If there is a dependency cycle, the foreign module may not have finished executing at the time it is required by one of its transitive dependencies; in this case, the object returned by "require" must contain at least the exports that the foreign module has prepared before the call to require that led to the current module's execution.
If the requested module cannot be returned, "require" must throw an error.
In a module, there is a free variable called "exports", that is an object that the module may add its API to as it executes.
modules must use the "exports" object as the only means of exporting.

---

### Requiring Modules

Modules can live different places with JavaScript. They can be on local machines, virtual machines, servers, remote URI locations, or anywhere really.

---

### Loading Node Modules

These modules can be loaded with module loaders like require or via inversion of control patterns.

```js
var filesystem = require('fs'),
    databaseConfigs = require('./configs/database.json'),
    routes = require('../routes'),
    server = require('./boot/server.js')
```

^A module identifier is a String of "terms" delimited by forward slashes.
A term must be a camelCase identifier, ".", or "..".
Module identifiers may not have file-name extensions like ".js".
Module identifiers may be "relative" or "top-level". A module identifier is "relative" if the first term is "." or "..".
Top-level identifiers are resolved off the conceptual module name space root.
Relative identifiers are resolved relative to the identifier of the module in which "require" is written and called.
Whether a PATH is supported by the module loader for resolving module identifiers.

---

### Creating a Module with a "Class" Example:

```js
function UserController() {
  var username, password;
  function doLogin(user,pw) {
    username = user;
    password = pw;
    // do the rest of the login work
  }
  var publicAPI = {
    login: doLogin
  };
  return publicAPI;
}
// create a `UserController` instance
var ctrl = UserController();
ctrl.login( "fred", "12Battery34!" );
```

---

### Node Patterns for Module Exports

* `module.exports = function(ops) {...}`
* `module.exports = {...}`
* `exports.methodA = function(ops) {...}`
* `exports.obj = {...}`

---

### Function Pattern

`module.js`:

```js
module.exports = function(options) {
  var limit = 100
  if (options.type === 'foobar') {
    limit = 200;
  }
  return {
    name: 'request',
    limit: limit,
    type: options.type,
    method: function(data) { return data; }
  };
};
```

^Provides constructor/init function - more versatile.

---

### Function Pattern

`main.js`:

```js
var mod = require('./module.js');
var request = mod({
  type:'foobar'
});
request.method({
  x: 10,
  y: 20
});
```

---

### Prototypal Inheritance

`validator.js`:

```js
var Validator = exports.Validator = function() {
    this._rules = [];
};

Validator.prototype.addRule = function(rule) {
    this._rules.push(rule)
};

Validator.prototype.validate = function(instance) {
    ...
};
```

---

### Prototypal Inheritance

`specificValidator.js` (util.inherits):

```js
var SpecificValidator = function() {
  Validator.call(this);
};

require('util').inherits(SpecificValidator, Validator);

SpecificValidator.prototype.filter = function(instance) {
  ...
};
```

---

### Prototypal Inheritance

`client.js`:

```js
var validator = new SpecificValidator();

validator.filter( { ... } );   // Calls function on derived object

validator.validate( { ... } ); // Calls function on base object
```

---

## How-to Examples

* day1-06-modules-step1.js
* day1-07-modules-step2.js  (which references the greetings.js file)

^Also reference the increment.js, math.js, and day1-05-modules-basic.js file to provide another discussion point and example of how to build modules.
Walk through the steps in the following files.  (be sure to mirror your display to make it easier)

---

# npm

---

### Meet the beast!

![inline](images/npm.png)

^Discuss what NPM is, the capabilities it adds. Lecture on how it can also be used for much more than merely the repository of where libraries are but also a deployment tool, how the package.json file comes into place and more.

---

### What is npm?

A package manager for Node.

* Website: <https://www.npmjs.com/>
* Command-line tool: `npm`
* Registries: public and private

---

### Introduction to NPM

Two ways to install a module:

* Locally: most of your projects' dependencies, e.g., express, request, hapi

  `npm install module-name`

* Globally: comman-line tools only (mostly), e.g., mocha, grunt, slc

  `npm install -g module-name`

^(Some frameworks offer CLI, but most of them mainly belong into 1. category-don't try to install `express` with `-g`!)
node_modules is your friend— no conflicts unlike Ruby, Python... because each dep. has nested dependincies

---

### Installing packages

```bash
$ npm install express
$ npm install express@4.2.0
$ npm install express@latest
$ npm install express --save
$ npm install mocha --save-dev
$ npm install grunt -g
$ sudo npm install grunt -g
```

^Ways to install locally
--save (and --save-dev) saves into package.json
Discuss semantic versioning!

---

### Package.json

Creating package.json: Run init action to interactively create a package.json

```
$ npm init

This utility will walk you through creating a package.json
file.  It only covers the most common items, and tries to
guess sane defaults.

See `npm help json` for definitive documentation on these
fields and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package
and save it as a dependency in the package.json file

Press ^C at any time to quit
name: (my-package-name)
```

---

### Package.json

```js
{
  "name": "my-cool-app",
  "version": "0.1.0",
  "description": "A gret new application",
  "main": "server.js",
  "dependencies": {
    "express": "~4.2.0",
    "ws": "~0.4.25"
  },
  "devDependencies": {
    "grunt": "~0.4.0"
  }
}
```

^Package.json is required for npm modules

---

### npm

When running `npm install NAME` in a folder:

* nmp looks for node_modules or package.json
* if nothing is found it goes up the tree

Therefore, in an empty folder, create package.json or node_modules dir first.

---

## How-to Example

Sample Code:

day1-11-npm-cli.txt

^Step through installing some libraries and setting up a project with npm init


---

### Public Modules & Registries

Set config values...

```
$ npm set init.author.name "Your Name"
$ npm set init.author.email "you@example.com"
$ npm set init.author.url "http://yourblog.com"
```

Sign up on the npm website and add yourself:

```
$ npm adduser
```

---

### Publishing your module

Add `package.json` (maybe try `npm init`)

Then Publish!

```
$ cd my-cool-app
$ npm publish
```

---

### Private Registries

* Hosted by npmjs
* Hosted by you

^Discuss the differences between npmjs.org and enterprise private repositories. Elaborate on how internal can be used and mixed with the public repository.

---

Advantages of private:

Code is not exposed to outside and no external dependencies (if self-hosted)

(There are strategies for deployment, e.g., tar file)

---

To list curently installed npm modules, use the ls action
ls lists out modules local to the current Node project

```bash
$ npm ls
/home/johndoe/node-app
|__ q@1.0.1
```

To list globally installed modules, add the -g flag

```bash
$ npm ls -g
/usr/lib
|__ bower@1.3.11
  |__ abbrev@1.0.5
  |__ archy@0.0.2
|__ semver@4.0.0
```

---

### Search

Search for npm modules via the search action

```
$ npm search [keyword]
```

This action carries out several tasks

1. queries the npm Registry
1. retrieves search results
1. prints it out to standard output

---

### Update

To update an npm module, use the update command

```
$ npm update mysql
```

Updating only works if the module has already been installed

---

### Remove a module

To remove an npm module

```
$ npm rm mysql
```

To remove a global module

```
$ npm rm mysql -g
```

---

### Packaging

Module packaging in Node is done using a `package.json` file
There are many options that can be configured:

* name
* version number
* dependencies
* etc

---

### Private Modules

The private attribute prevents accidental publishing

```js
{
    "name" : "my-private-module",
    "version": "0.0.1",
    ...
    "private": true,
    ...
}
```


---

# npm Enterprise

^Mention that npm has self-hosted version


---

## When to use `-g`?

A: Only for command-line tools. They usually have `bin` in package.json:

```js
{
  "name": "stream-adventure",
  "version": "4.0.4",
  "description": "an educational stream adventure",
  "bin": {
    "stream-adventure": "bin/cmd.js"
  },
  "dependencies": {
    ...
```

---

# Hello World

---

### Web Content

Types of web content

* Static
* Dynamic

^This content is here to dive deeper into what to build with and how to build Node.js apps from a rudimentary level.

---

### Static content

Static content is inclusive of things like image files, static html files that are already put together, and other related content that is stored on some style of drive storage and available for immediate return to a requestor via general response.

---

### Dynamic content

Dynamic content, which is the content that is put together - or generated - by code pulling together data from data sources or other means, and then provided to the requestor.

---

### I/O

Node.js is excellent at dynamic generation and returning content that is pure I/O in the sense of built or dynamic content.

For static content like image files and related content it is actually a great benefit to hand that off to server software that can handle the specific OS level request.

^Node.js can absolutely handle these requests, but it is often better to offload that to servers that specifically handle this static content like CDNs, OS level call systems, or object stores.

---


### The server, request, response objects

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```

^createServer callback is called each time there's a request
no nmp modules in this example

---

### Running the App

Run with:

```
$ node server.js
```

Send requests:

```
$ curl http://localhost:1337
```

Or

<http://localhost:1337>

---

### HTTP Object

Http object:

<https://nodejs.org/api/http.html>
<https://nodejs.org/api/http.html#http_class_http_server>

```js
var server = http.createServer([requestListener])
server.listen(port[, hostname][, backlog][, callback])
```

---

### HTTP Response

```js
response.writeHead(200, {
  'Content-Length': body.length,
  'Content-Type': 'text/plain' });
```

---

## How-to Example

Sample Code (`code/node`):

1. day1-08-nodejs-app.js
1. day1-09-nodejs-app2.js
1. day1-11-nodejs-static-server.js

---

## Questions and Exercises

:+1:

---

## Workshop

One hand: help, two hands: finished one task

```
$ sudo npm install learnyounode -g
```
