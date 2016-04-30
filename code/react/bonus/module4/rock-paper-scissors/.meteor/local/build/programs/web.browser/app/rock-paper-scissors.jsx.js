(function(){var choices = ['rock',
  'paper',
  'scissors'
]

var Games = new Meteor.Collection("games")

if (Meteor.isClient) {

  var MessagesList = React.createClass({displayName: "MessagesList",
    mixins: [ReactMeteor.Mixin],
    getMeteorState: function() {
      return {
        games: Games.find({createdBy: Meteor.userId}).fetch().reverse()
      }
    },
    makeMove: function(e){
      var opponentAnswer = Math.floor(Math.random()*3)
      var answer =e.target.getAttribute('data-answer-index')
      var outcome = rps.compare(answer, opponentAnswer, choices)
      this.setState({opponentAnswer: opponentAnswer,
        answer: answer,
        outcome: outcome
      })
      Games.insert({
        createdBy: Meteor.userId,
        opponentAnswer: opponentAnswer,
        answer: answer,
        outcome: outcome})
    },
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("h1", null, "Welcome to Rock-paper-scissors!"), 
          React.createElement("img", {src: "/rock-paper-scissors.svg"}), 
          React.createElement("p", null, "Make your move"), 
          React.createElement("button", {onClick: this.makeMove, "data-answer-index": "0"}, "Rock"), 
          React.createElement("button", {onClick: this.makeMove, "data-answer-index": "1"}, "Paper"), 
          React.createElement("button", {onClick: this.makeMove, "data-answer-index": "2"}, "Scissors"), 
          (!this.state.answer)? '': React.createElement("p", null, "You selected ", choices[this.state.answer], ".", React.createElement("br", null), 
            "Opponent selected ", choices[this.state.opponentAnswer], ". ", React.createElement("br", null), 
            "Outcome: ", this.state.outcome), 
            React.createElement("div", null, this.state.games.map(function(value, index){
              if (value.outcome.indexOf('lose')>-1)
                var style = {color: 'red'}
              else
                var style = {color: 'blue'}
              console.log(value)
              return React.createElement("p", {
                key: value._id, 
                style: style}, 
                  choices[value.answer], " (you)  vs. ", choices[value.opponentAnswer], "—", 
                  value.outcome
              )
              }))
        )

      )
    }
  })
  Meteor.startup(function() {
    React.render(React.createElement(MessagesList, null), document.body);
  })

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

})();
