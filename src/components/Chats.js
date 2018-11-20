import React from 'react'
import axios from 'axios'
import Chat from './Chat'
import {Header, Table, Grid, Button, TextArea, Form} from 'semantic-ui-react'
import './mystyles.css';

class Messages extends React.Component {


constructor(props) {
super(props);

this.state = {
  messages: [],
  choosedChat: "",
  messageToSend: "",
  offset: 0,
};
this.onMessageToSendChange = this.onMessageToSendChange.bind(this);
this.onSendMessageClick = this.onSendMessageClick.bind(this);
this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
console.log("Constructor in messages called");
}

componentDidMount() {

// this.getMessages();

// COMMENTED BY NOW
  // axios.get('http://localhost:8080/messages/'+'1')
  // .then(res => {
  //   const messages = res.data;
  //   this.setState({messages});
  // })
  // console.log('Get method called on ${this.props.chatId} chat');
}

onLoadMoreClick(e){
  this.setState({offset:(this.state.offset+10)});
  console.log("clicked "+this.state.offset);
}

getMessages(param){
  console.log("PARAM IN GETMESSAGES "+param);
  axios.get('http://localhost:8080/messages/'+param)
  .then(res => {
    const messages = res.data.reverse();
    this.setState({messages});
  })
  console.log('Ajax call getMessages done');
}

 componentWillReceiveProps(nextProps){
   console.log("componentWillReceiveProps called");
   console.log("nextProps: "+nextProps.chatId);
   console.log("this.props.chatId: "+this.props.chatId);
   this.getMessages(nextProps.chatId);
   if(nextProps.chatId!=this.props.chatId){
     this.setState({offset:0});
     // var x = nextProps.chatId;
     // console.log("VAR X "+x);
     // this.setState({choosedChat : x}, function(){});
     // console.log("CHOOSED CHAT STATE"+this.state.choosedChat);
     // this.props.chatId = x;
     // this.getMessages();
   }
 }
onMessageToSendChange(e){
  var val = e.target.value;
  this.setState({messageToSend:val});
}
onSendMessageClick(e){
  e.preventDefault();

  // var currentTime = new Date(),

  var currentTime = new Date();
  console.log(currentTime);
  console.log("EXECUTING YEAR "+currentTime.getFullYear());
  console.log("EXECUTING MONTH "+(currentTime.getMonth()+1));
  console.log("EXECUTING DAY "+currentTime.getDate());
  console.log("EXECUTING HOURS "+currentTime.getHours());
  console.log("EXECUTING Minutes "+currentTime.getMinutes());
  console.log("EXECUTING Seconds "+currentTime.getSeconds());

  var formattedDate = currentTime.getFullYear()+'-'+(currentTime.getMonth()+1)+'-'+currentTime.getDate()+'@'+currentTime.getHours()+':'+currentTime.getMinutes()+':'+currentTime.getSeconds();
  var data ={
    text: this.state.messageToSend,
    userId: '1',
    chatId: this.props.chatId,
    date: formattedDate,
  }

  var headers = {
   'Access-Control-Allow-Origin': '*',
   // 'Accept': 'application/json',
   'Content-Type': 'application/json',
 }
 axios.post("http://localhost:8080/message", data, {headers:headers})
   .then(res => {
     console.log(res);
     console.log(res.data);
   })
}

render() {
  console.log("Render in messages called");
if(this.props.chatId === ""){
  return (
    <div>
      Choose chat to start conversation.
    </div>
  );
}else{
  // this.getMessages();
  // console.log('Render method called on');
  return(
    <div>
      <h1>{`/messages/${this.props.chatId}`}</h1>
        <div className="messageScrollBox">
            <Button primary fluid onClick={this.onLoadMoreClick}>
              Load More
            </Button>
            {this.state.messages.map(message =>
              <Grid  key={message.id}>
                <Grid.Column width={5} floated={message.userId===1 ? 'right' : 'left'}  className={message.userId===1 ? "box sb1" : "box sb2"}>
                  User id: {message.userId} : {message.text} : {message.date} : Chat Id {message.chatId}
                </Grid.Column>
              </Grid>
            )}
        </div>
        <Grid>
          <Grid.Column>
            <Form onSubmit={this.onSendMessageClick}>
              <Form.Group>
                <Form.Field width={15}>
                  <TextArea placeholder='Write your message' type='text' value={this.state.messageToSend} onChange={this.onMessageToSendChange}/>
                </Form.Field>
                <Button size='massive' type='submit'>
                  Send
                </Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
    </div>
  );
}
}
}


class Chats extends React.Component{
  constructor(props) {
  super(props);

  this.state = {
    chats: [],
    choosedChat: ""
  };
  // this.clickHandler = this.clickHandler.bind(this, 'Parameter');
  }

  componentDidMount() {
  // $.getJSON(`http://localhost:8080/messages/${this.props.subreddit}`)
  //   .then(res => {
  //     const messages =res;
  //     this.setState({ messages: messages });
  //   });
    axios.get('http://localhost:8080/chats/'+"1")
    .then(res => {
      const chats = res.data;
      this.setState({chats});
    })
    var currentTime = new Date();
    console.log(currentTime);
    console.log("EXECUTING YEAR "+currentTime.getFullYear());
    console.log("EXECUTING MONTH "+(currentTime.getMonth()+1));
    console.log("EXECUTING DAY "+currentTime.getDate());
    console.log("EXECUTING HOURS "+currentTime.getHours());
    console.log("EXECUTING Minutes "+currentTime.getMinutes());
    console.log("EXECUTING Seconds "+currentTime.getSeconds());
    console.log("FORMATTED: "+currentTime.getFullYear()+'-'+(currentTime.getMonth()+1)+'-'+currentTime.getDate()+'@'+currentTime.getHours()+'-'+currentTime.getMinutes()+'-'+currentTime.getSeconds());
  }

  clickHandler(chatid){
    this.setState({choosedChat: chatid}, function(){
    });

    // this.render();
  }


  render() {
  return (
    <Grid celled>
      <Grid.Column width={3}>
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              {`/chats/${this.state.choosedChat}`}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.chats.map(chat =>
              <Table.Row key={chat.id}>
                <Table.Cell>
                  <Header>
                    <Header.Content>
                      Chat id: {chat.id} : {chat.name}
                      <Button onClick={() => this.clickHandler(chat.id)}> Choose </Button>
                      <Header.Subheader>
                        Message will be here
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid.Column>
      <Grid.Column width={12}>
        <Messages chatId={this.state.choosedChat}/>
      </Grid.Column>
    </Grid>
  );
  }
}
export default Chats
