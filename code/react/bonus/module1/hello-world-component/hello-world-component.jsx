var HelloWorld = React.createClass({
  render: function() {
    return (
      <h1>Hello world!!!</h1>
    );
  }
})

React.render(
  <HelloWorld/>,
  document.getElementById('example')
);
