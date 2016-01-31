var Content = React.createClass({
  render: function() {
    return <div style={{border: '1px solid red'}}>
    </div>
  }
})

React.render(
  <Content></Content>,
  document.getElementById('content')
);