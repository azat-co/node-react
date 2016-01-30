footer: © Node Program, 2016
slidenumbers: true

# Node Program
## Meteor

![inline 70%](images/np-logo120.png)


Node.js version: 5.1
Last updated: Jan 2016

---

# Meteor Features

* WebSockets
* MongoDB
* Blaze/React/Angular
* Node
* Packages and hosting

---

## Meteor Downsides

* Opinionated
* No large scale enterprise-grade deployment

---

Meter vs. SPA+REST API

^routes on UI, no shared code

---

```
$ meteor create app-name
$ cd app-name
$ meteor
```

---

```
app-name.js       # a JavaScript file loaded on both client and server
app-name.html     # an HTML file that defines view templates
app-name.css      # a CSS file to define your app's styles
.meteor               # internal Meteor files
```

---

```
$ meteor update --release VERSION_NUMBER
```

---

```js
if (Meteor.isClient) {
}
```

---


```js
if (Meteor.isServer) {
}
```

---

```js
Meteor.startup(function () {
  // Code to run on server at startup
});
```

---

```js
var Games = new Mongo.Collection('games')
```

---

```
<ul>
  {{#each games}}
    {{> game}}
  {{/each}}
</ul>
```

---

```js
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    games: function () {
      return Games.find({});
    }
  });
}
```

---

```
meteor mongo
```

```
db.games.insert({ text: "Hello world!", createdAt: new Date() });
```

---

```html
<form class="new-game">
  <input type="text" name="text" placeholder="Type to add new games" />
</form>
```     

---


```js
Template.body.events({
  "submit .new-game": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a game into the collection
    Tasks.insert({
     text: text,
     createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";
 }
});
```

---

```js
// This code only runs on the client
 Template.body.helpers({
   games: function () {
     // Show newest games at the top
     return Tasks.find({}, {sort: {createdAt: -1}});
   }
 });
```

---

### Demo

<https://github.com/azat-co/react/tree/master/ch4/rock-paper-scissors>

---

## Questions and Exercises

❓🙋:+1:

---

### Workshop 🔨

<https://www.meteor.com/tutorials/blaze/creating-an-app>
