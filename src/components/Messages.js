import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullRoster from './FullRoster'
import Player from './Player'
import axios from 'axios'

// The Roster component matches one of two different routes
// depending on the full pathname
class Messages extends React.Component {
constructor(props) {
super(props);

this.state = {
  messages: []
};
}

componentDidMount() {
// $.getJSON(`http://localhost:8080/messages/${this.props.subreddit}`)
//   .then(res => {
//     const messages =res;
//     this.setState({ messages: messages });
//   });
  axios.get('http://localhost:8080/messages/'+"1")
  .then(res => {
    const messages = res.data;
    this.setState({messages});
  })
}

// componentDidMount(){
//   fetch("`http://localhost:8080/messages/${this.props.subreddit}`")
//     .then(response=>response.json())
//     .then(data => this.setState({messages: data.hits}));
//
// }

render() {
return (
  <div>
    <h1>{`/messages/${this.props.chatId}`}</h1>
    <ul>
      {this.state.messages.map(message =>
        <li key={message.id}>User id: {message.userId} : {message.text} : {message.date}</li>
      )}
    </ul>
  </div>
);
}
}


export default Messages
