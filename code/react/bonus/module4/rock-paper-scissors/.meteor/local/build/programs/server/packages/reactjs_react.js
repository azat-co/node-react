(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var React, ReactMeteor;

(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/reactjs:react/src/require-react.js                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
React = Npm.require("react/addons");                                         // 1
                                                                             // 2
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/reactjs:react/src/ReactMeteor.js                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
var ReactMeteorMixin = {                                                     // 1
  componentWillMount: function() {                                           // 2
    var self = this;                                                         // 3
                                                                             // 4
    self._meteorStateDep = new Tracker.Dependency();                         // 5
    self._meteorFirstRun = true;                                             // 6
                                                                             // 7
    if (Meteor.isClient) {                                                   // 8
      Tracker.autorun(function(computation) {                                // 9
        self._meteorComputation = computation;                               // 10
        self._meteorStateDep.depend();                                       // 11
                                                                             // 12
        if (self.startMeteorSubscriptions) {                                 // 13
          // Calling this method in a Tracker.autorun callback will ensure   // 14
          // that the subscriptions are canceled when the computation stops. // 15
          self.startMeteorSubscriptions();                                   // 16
        }                                                                    // 17
                                                                             // 18
        enqueueMeteorStateUpdate(self);                                      // 19
      });                                                                    // 20
                                                                             // 21
    } else {                                                                 // 22
      enqueueMeteorStateUpdate(self);                                        // 23
    }                                                                        // 24
  },                                                                         // 25
                                                                             // 26
  componentWillUpdate: function(nextProps, nextState) {                      // 27
    if (this._meteorCalledSetState) {                                        // 28
      // If this component update was triggered by the ReactMeteor.Mixin,    // 29
      // then we do not want to trigger the change event again, because      // 30
      // that would lead to an infinite update loop.                         // 31
      this._meteorCalledSetState = false;                                    // 32
      return;                                                                // 33
    }                                                                        // 34
                                                                             // 35
    if (this._meteorStateDep) {                                              // 36
      this._meteorStateDep.changed();                                        // 37
    }                                                                        // 38
  },                                                                         // 39
                                                                             // 40
  componentWillUnmount: function() {                                         // 41
    if (this._meteorComputation) {                                           // 42
      this._meteorComputation.stop();                                        // 43
      this._meteorComputation = null;                                        // 44
    }                                                                        // 45
  }                                                                          // 46
};                                                                           // 47
                                                                             // 48
function enqueueMeteorStateUpdate(component) {                               // 49
  var partialState =                                                         // 50
    component.getMeteorState &&                                              // 51
    component.getMeteorState();                                              // 52
                                                                             // 53
  if (! partialState) {                                                      // 54
    // The getMeteorState method can return a falsy value to avoid           // 55
    // triggering a state update.                                            // 56
    return;                                                                  // 57
  }                                                                          // 58
                                                                             // 59
  if (component._meteorFirstRun) {                                           // 60
    // If it's the first time we've called enqueueMeteorStateUpdate since    // 61
    // the component was mounted, set the state synchronously.               // 62
    component._meteorFirstRun = false;                                       // 63
    component._meteorCalledSetState = true;                                  // 64
    component.setState(partialState);                                        // 65
    return;                                                                  // 66
  }                                                                          // 67
                                                                             // 68
  Tracker.afterFlush(function() {                                            // 69
    component._meteorCalledSetState = true;                                  // 70
    component.setState(partialState);                                        // 71
  });                                                                        // 72
}                                                                            // 73
                                                                             // 74
// Like React.render, but it replaces targetNode, and works even if          // 75
// targetNode.parentNode has children other than targetNode.                 // 76
function renderInPlaceOfNode(reactElement, targetNode) {                     // 77
  var container = targetNode.parentNode;                                     // 78
  var prevSibs = [];                                                         // 79
  var nextSibs = [];                                                         // 80
  var sibs = prevSibs;                                                       // 81
  var child = container.firstChild;                                          // 82
                                                                             // 83
  while (child) {                                                            // 84
    if (child === targetNode) {                                              // 85
      sibs = nextSibs;                                                       // 86
    } else {                                                                 // 87
      sibs.push(child);                                                      // 88
    }                                                                        // 89
    var next = child.nextSibling;                                            // 90
    container.removeChild(child);                                            // 91
    child = next;                                                            // 92
  }                                                                          // 93
                                                                             // 94
  var result = React.render(reactElement, container);                        // 95
  var rendered = container.firstChild;                                       // 96
                                                                             // 97
  if (prevSibs.length > 0) {                                                 // 98
    prevSibs.forEach(function(sib) {                                         // 99
      container.insertBefore(sib, rendered);                                 // 100
    });                                                                      // 101
  }                                                                          // 102
                                                                             // 103
  if (nextSibs.length > 0) {                                                 // 104
    nextSibs.forEach(function(sib) {                                         // 105
      container.appendChild(sib);                                            // 106
    });                                                                      // 107
  }                                                                          // 108
                                                                             // 109
  return result;                                                             // 110
}                                                                            // 111
                                                                             // 112
function unmountComponent(reactComponent) {                                  // 113
  var rootNode = React.findDOMNode(reactComponent);                          // 114
  var container = rootNode && rootNode.parentNode;                           // 115
                                                                             // 116
  if (container) {                                                           // 117
    var siblings = [];                                                       // 118
    var sibling = container.firstChild;                                      // 119
                                                                             // 120
    while (sibling) {                                                        // 121
      var next = sibling.nextSibling;                                        // 122
      if (sibling !== rootNode) {                                            // 123
        siblings.push(sibling);                                              // 124
        container.removeChild(sibling);                                      // 125
      }                                                                      // 126
      sibling = next;                                                        // 127
    }                                                                        // 128
                                                                             // 129
    React.unmountComponentAtNode(container);                                 // 130
                                                                             // 131
    siblings.forEach(function (sib) {                                        // 132
      container.appendChild(sib);                                            // 133
    });                                                                      // 134
  }                                                                          // 135
}                                                                            // 136
                                                                             // 137
ReactMeteor = {                                                              // 138
  Mixin: ReactMeteorMixin,                                                   // 139
                                                                             // 140
  // So you don't have to mix in ReactMeteor.Mixin explicitly.               // 141
  createClass: function createClass(spec) {                                  // 142
    spec.mixins = spec.mixins || [];                                         // 143
    spec.mixins.push(ReactMeteorMixin);                                      // 144
    var Cls = React.createClass(spec);                                       // 145
                                                                             // 146
    if (Meteor.isClient &&                                                   // 147
        typeof Template === "function" &&                                    // 148
        typeof spec.templateName === "string") {                             // 149
      var template = new Template(                                           // 150
        spec.templateName,                                                   // 151
        function() {                                                         // 152
          // A placeholder HTML element that will serve as the mounting      // 153
          // point for the React component. May have siblings!               // 154
          return new HTML.SPAN;                                              // 155
        }                                                                    // 156
      );                                                                     // 157
                                                                             // 158
      template.onRendered(function() {                                       // 159
        this._reactComponent = renderInPlaceOfNode(                          // 160
          // Equivalent to <Cls {...this.data} />:                           // 161
          React.createElement(Cls, this.data || {}),                         // 162
          this.find("span")                                                  // 163
        );                                                                   // 164
      });                                                                    // 165
                                                                             // 166
      template.onDestroyed(function() {                                      // 167
        unmountComponent(this._reactComponent);                              // 168
      });                                                                    // 169
                                                                             // 170
      Template[spec.templateName] = template;                                // 171
    }                                                                        // 172
                                                                             // 173
    return Cls;                                                              // 174
  }                                                                          // 175
};                                                                           // 176
                                                                             // 177
///////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['reactjs:react'] = {
  React: React,
  ReactMeteor: ReactMeteor
};

})();

//# sourceMappingURL=reactjs_react.js.map
