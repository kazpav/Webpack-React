import React from 'react'
import axios from 'axios'
import Chat from './Chat'
import {Header, Table, Grid, Button, TextArea, Form, Segment, Divider} from 'semantic-ui-react'
import './mystyles.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import {ACCESS_TOKEN, CURRENT_USER_ID} from '../constants';


class Messages extends React.Component {


constructor(props) {
super(props);

this.state = {
  messages: [],
  choosedChat: "",
  messageToSend: "",
  offset: 0,
  lastMessage: "null",
  topMessage: "",
  messageGroups:[],
  loadedHistory:[],
  moreMessages: [],
  recentMessages: []
};
this.onMessageToSendChange = this.onMessageToSendChange.bind(this);
this.onSendMessageClick = this.onSendMessageClick.bind(this);
this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
this.updateMessages = this.updateMessages.bind(this);
console.log("Constructor in messages called");
}

componentDidMount() {
}

onLoadMoreClick(e){
  this.setState({offset:(this.state.offset+10)}, function(){
    console.log("clicked "+this.state.offset);
  });

}

getMessages(param){
  this.setState({loadedHistory:[]});
  console.log("PARAM IN GETMESSAGES "+param);
  axios.get('http://localhost:8080/api/messages/'+param+'/5',{ headers: { Authorization:  'Bearer '+localStorage.getItem(ACCESS_TOKEN)}})
  .then(res => {
    const messages = res.data.reverse();
    console.log(messages);
    this.setState({messages}, function(){
      this.setState({topMessage:this.state.messages[0]}, function(){

        console.log("ARRAY length "+this.state.messages.length);
        console.log("top MESSAGE "+JSON.stringify(this.state.topMessage));
        var headers = {
         'Access-Control-Allow-Origin': '*',
         // 'Accept': 'application/json',
         'Content-Type': 'application/json',
       }
       console.log("JSON that comes in POST request "+JSON.stringify(this.state.topMessage));
       if(this.state.topMessage!==undefined){
          axios.get("http://localhost:8080/api/messages_groups/"+param+"/"+this.state.topMessage.id , { headers: { Authorization:  'Bearer '+localStorage.getItem(ACCESS_TOKEN)}})
            .then(res => {
              const  messageGroups = res.data;
              this.setState({messageGroups});
            })
        }
      })
      this.setState({lastMessage:this.state.messages[this.state.messages.length-1]}, function(){
        console.log("Last message "+JSON.stringify(this.state.lastMessage));
      })
    });
  })

}

 componentWillReceiveProps(nextProps){
   this.setState({recentMessages:[]})
   this.setState({lastMessage: ""});
   console.log("componentWillReceiveProps called");
   console.log("nextProps: "+nextProps.chatId);
   console.log("this.props.chatId: "+this.props.chatId);
   setInterval( this.updateMessages, 10000);
   this.setState({messageGroups:[]});
   this.getMessages(nextProps.chatId);
   if(nextProps.chatId!=this.props.chatId){
     this.setState({offset:0});
 }
}
 componentDidUpdate(){
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

  var formattedDate = currentTime.getFullYear()+'-'+(currentTime.getMonth()+1)+'-'+currentTime.getDate()+' '+currentTime.getHours()+':'+currentTime.getMinutes()+':'+currentTime.getSeconds();
  var data ={
    text: this.state.messageToSend,
    userId: localStorage.getItem(CURRENT_USER_ID),
    chatId: this.props.chatId,
    date: formattedDate,
  }

  var headers = {
   'Access-Control-Allow-Origin': '*',
   // 'Accept': 'application/json',
   'Content-Type': 'application/json',
 }
 axios.post("http://localhost:8080/api/message", data, { headers: { Authorization:  'Bearer '+localStorage.getItem(ACCESS_TOKEN)}})
   .then(res => {
     console.log(res);
     console.log(res.data);
   })

  this.setState({messageToSend : ""});
}

onLoadGroupClick(group){
  console.log(group);
  var headers = {
   'Access-Control-Allow-Origin': '*',
   // 'Accept': 'application/json',
   'Content-Type': 'application/json',
 }
  axios.get("http://localhost:8080/api/messages_of_group/"+this.props.chatId+"/"+group.start_id+"/"+group.end_id, { headers: { Authorization:  'Bearer '+localStorage.getItem(ACCESS_TOKEN)}})
  .then(res=>{
    const loadedHistory = res.data.reverse();
    console.log(loadedHistory);
    this.setState({loadedHistory});
  })
}

updateMessages(e){
  if(typeof(this.state.lastMessage)!=='undefined'){
    console.log("UPDATE MESSAGE CALLED");
    console.log("LAST MESSAGE" +JSON.stringify(this.state.lastMessage));

    axios.get("http://localhost:8080/api/messages_after/"+this.props.chatId+"/"+this.state.lastMessage.id, { headers: { Authorization:  'Bearer '+localStorage.getItem(ACCESS_TOKEN)}})
    .then(res=>{
      const recentMessages = res.data.reverse();
      console.log(recentMessages);
      this.setState({recentMessages});
    })

  }else{
    console.log("WON'T UPDATE ");
  }
}
componentWillUnmount(){
  console.log("UNMOUTHED COMPONENTTTT");
  this.setState({lastMessage: ""});
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

  return(
    <div>
      <h1>{`/messages/${this.props.chatId}`}</h1>
        <ScrollToBottom  className="messageScrollBox" id="messageScrollBox">
            {this.state.messageGroups.map(group=>
            <Segment textAlign='center' key={group.firstMessageDate} onClick={() => this.onLoadGroupClick(group)}>
              Messages from {group.firstMessageDate} to {group.lastMessageDate} ({group.count})
            </Segment>
            )}
            {this.state.loadedHistory === [] ?
              <div></div> : this.state.loadedHistory.map(mess=>
                 <Grid  key={mess.id}>
                   <Grid.Column width={7} floated={JSON.stringify(mess.userId)===localStorage.getItem(CURRENT_USER_ID) ? 'right' : 'left'}  className={JSON.stringify(mess.userId)===localStorage.getItem(CURRENT_USER_ID) ? "box sb1" : "box sb2"}>
                   <Grid verticalAlign='middle' columns={3} centered>
                     <Grid.Row>
                       <Grid.Column floated='left'>
                         UserId {mess.userId}
                       </Grid.Column>
                       <Grid.Column floated='rigt'>
                          {mess.date}
                       </Grid.Column>
                     </Grid.Row>
                     <Grid.Row>
                          {mess.text}
                     </Grid.Row>
                   </Grid>
                   </Grid.Column>
                 </Grid>
               )
            }
            <Divider horizontal> Recent Messages </Divider>
            {this.state.messages.map(message =>
              <Grid  key={message.id}>
                <Grid.Column width={7} floated={JSON.stringify(message.userId)===localStorage.getItem(CURRENT_USER_ID) ? 'right' : 'left'}  className={JSON.stringify(message.userId)===localStorage.getItem(CURRENT_USER_ID) ? "box sb1" : "box sb2"}>
                  <Grid verticalAlign='middle' columns={3} centered>
                    <Grid.Row>
                      <Grid.Column floated='left'>
                        UserId {message.userId}
                      </Grid.Column>

                      <Grid.Column floated='rigt'>
                         {message.date}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>

                         {message.text}

                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid>
            )}
          
          {this.state.recentMessages === [] ?
            <div></div> : this.state.recentMessages.map(recMess=>
               <Grid  key={recMess.id}>
                 <Grid.Column width={7} floated={JSON.stringify(recMess.userId)===localStorage.getItem(CURRENT_USER_ID) ? 'right' : 'left'}  className={JSON.stringify(recMess.userId)===localStorage.getItem(CURRENT_USER_ID) ? "box sb1" : "box sb2"}>
                 <Grid verticalAlign='middle' columns={3} centered>
                   <Grid.Row>
                     <Grid.Column floated='left'>
                       UserId {recMess.userId}
                     </Grid.Column>
                     <Grid.Column floated='rigt'>
                        {recMess.date}
                     </Grid.Column>
                   </Grid.Row>
                   <Grid.Row>
                        {recMess.text}
                   </Grid.Row>
                 </Grid>
                 </Grid.Column>
               </Grid>
             )
          }
            <div ref={(el) => { this.messagesEnd = el; }}> </div>
        </ScrollToBottom >
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
  console.log("ACESS TOKEN IN CHATS "+localStorage.getItem(ACCESS_TOKEN));
  // var headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Authorization': "Bearer "+localStorage.getItem(ACCESS_TOKEN),
  //   'Content-Type': 'application/json',
  // }
    axios.get("http://localhost:8080/api/chats_of_user",  { headers: { Authorization:  'Bearer '+localStorage.getItem(ACCESS_TOKEN) } })
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
              <Table.Row key={chat.id} onClick={() => this.clickHandler(chat.id)}>
                <Table.Cell>
                  <Header>
                    <Header.Content>
                      Chat id: {chat.id} : {chat.name}
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
