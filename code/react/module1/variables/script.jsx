var Content = React.createClass({
  render: function() {
    var a = 1
    return (
      <div>
        <h1>
          {a}. Core React.js
        </h1>
        <p>This text is very useful for learning React.js.</p>
      </div>
    );
  }
})

React.render(
  <Content />,
  document.getElementById('content')
);

