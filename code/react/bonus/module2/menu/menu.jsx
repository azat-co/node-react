var MenuExample = React.createClass({
  getInitialState: function(){
    return {selectedItemIndex: 0}
  },
  clicked: function(index){
    this.setState({selectedItemIndex: index})
  },
  render: function() {
    var _this = this
    return (
      <div>
        <ul className="nav nav-pills">
          {this.props.items.map(function(menuItemName, menuItemIndex){
            var className = ''
            if(_this.state.selectedItemIndex == menuItemIndex){
              className = 'active'
            }
            return <li role="presentation"
              className={className}
              onClick={_this.clicked.bind(_this, menuItemIndex)}>
                <a href="#">{menuItemName}</a>
              </li>
          })}
        </ul>
        <p>Selected: {this.props.items[this.state.selectedItemIndex]}</p>
      </div>
    )
  }
})

React.render(
  <MenuExample items={['Home', 'About', 'Prices', 'Contact us']} />,
  document.body
);
