footer: © Node Program, 2016
slidenumbers: true

# Node Program
## Express.js

![inline 70%](images/np-logo120.png)

Node.js version: 5.1
Last updated: Jan 2016

---

## Express

Express is the most popular web application framework for Node

It is easy to work with as it ties into Node's functional paradigm

* Deliver static content (or consider using nginx)
* Modularize business logic
* Construct an API
* Connect to various data sources

---

### Installing Dependency

```
$ npm install express --save
```

---


### Installing Scaffolding

Install Express.js command-line generator:

```
$ npm install -g express-generator
```

---

### Using the Generator

```
$ express todo-list-app
```

^Go through all aspects of the generated app and point out various features. Specifically talk about app.js and how it abstracts away some things for testing

* `app.js`: main file, houses the embedded server and application logic
* `public/`: contains static files to be served by the embedded server
* `routes/`: houses custom routing for the embedded server
* `views/`:  contains templates that can be processed by a template engine

---

### Configuring Express

The Express server needs to be configured before it can start

Manage configuration via the `set` method:

```
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', 'views'); // the directory the templates are stored in
app.set('view engine', 'jade');
```

---

## Node.js Middleware pattern

---

### What is Middleware

Middleware pattern is a series of processing units connected together, where the output of one unit is the input for the next one. In Node.js, this often means a series of functions in the form:

```js
function(args, next) {
  next(output) // error or real output
}
```

---

### Connect Middleware

Example:

```js
app.use(function middleware1(req, res, next) {
  // middleware 1
  next();
});
app.use(function middleware2(req, res, next) {
  // middleware 2
  next();
});
```

---

### Middleware Order

Middleware are executed in the order specified:

```js
app.use(express.logger('dev'));
app.use(express.basicAuth('test', 'pass'));
app.use(express.json());
```

---

### Creating Middleware

Custom middleware is easy to create:

```js
app.use(function (req, res, next) {
  // modify req or res
  // execute the callback when done
  next();
});
```

---

## Connect Framework

Express leverages the Connect framework to provide middleware
functionality.

Middlewares are used to manage how a request should be handled.

---

### Most Popular and Useful Connect/Express Middleware

`$ npm install <package_name> --save`

* [body-parser](https://github.com/expressjs/body-parser) request payload
* [compression](https://github.com/expressjs/compression) gzip
* [connect-timeout](https://github.com/expressjs/timeout) set request timeout
* [cookie-parser](https://github.com/expressjs/cookie-parser) Cookies
* [cookie-session](https://github.com/expressjs/cookie-session) Session via Cookies store

---

### Connect/Express Middleware

* [csurf](https://github.com/expressjs/csurf) CSRF
* [errorhandler](https://github.com/expressjs/errorhandler) error handler
* [express-session](https://github.com/expressjs/session) session via in-memory or other store
* [method-override](https://github.com/expressjs/method-override) HTTP method override
* [morgan](https://github.com/expressjs/morgan) server logs
* [response-time](https://github.com/expressjs/response-time)

---

### Connect/Express Middleware

* [serve-favicon](https://github.com/expressjs/serve-favicon) favicon
* [serve-index](https://github.com/expressjs/serve-index)
* [serve-static](https://github.com/expressjs/serve-static) static content
* [vhost](https://github.com/expressjs/vhost)

---

## Other Popular Middleware

* [cookies](https://github.com/jed/cookies) and [keygrip](https://github.com/jed/keygrip): analogous to `cookieParser`
* [raw-body](https://github.com/stream-utils/raw-body)
* [connect-multiparty](https://github.com/superjoe30/connect-multiparty), [connect-busboy](https://github.com/mscdex/connect-busboy)
* [qs](https://github.com/visionmedia/node-querystring): analogous to `query`
* [st](https://github.com/isaacs/st), [connect-static](https://github.com/andrewrk/connect-static) analogous to `staticCache`

---

## Other Popular Middleware

* [express-validator](https://github.com/ctavan/express-validator): validation
* [less](https://github.com/emberfeather/less.js-middleware): LESS CSS
* [passport](https://github.com/jaredhanson/passport): authentication library
* [helmet](https://github.com/evilpacket/helmet): security headers
* [connect-cors](http://github.com/antono/connect-cors): CORS
* [connect-redis](http://github.com/visionmedia/connect-redis)

---

### Template Engine

Setting the `view engine` variable to `jade` for instance, would trigger
the following function call internally

```js
app.set('view engine', 'jade'); // shorthand

// does the same as the above
app.engine('jade', require('jade').__express);
```

---

### Template Engine

Custom callbacks can be defined to parse templates

```js
app.engine([format], function (path, options, callback) {
  // template parsing logic goes here
});
```

Note: custom callbacks are useful if the template engine doesn't export
  an **__express** function

---

### Running Express

```js
var http = require('http'),
    express = require('express');

var app = express();

// ...

var server = http.createServer(app);
server.listen(app.get('port'), function () {
  // Do something... maybe log some info?
});
```

---

### Alternatives


* Sails
* LoopBack :point_left:
* Meteor
* Hapi
* Restify

Registry of hand-picked Node frameworks: [nodeframework.com](http://nodeframework.com)

---

## Questions and Exercises

:+1:

---

## Workshop

🔨


```
$ npm install -g expressworks
```
