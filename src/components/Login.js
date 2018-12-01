import React from 'react'
import axios from 'axios'
import  {Button, Form, Grid}  from 'semantic-ui-react';
import {ACCESS_TOKEN, CURRENT_ROLES, CURRENT_USER_ID} from '../constants';
import Chats from './Chats'
import { Redirect, Link } from 'react-router-dom'



class Login extends React.Component{

    constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      errorMessage:"",
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onEmailChange(e){
    var val = e.target.value;
    this.setState({email:val});
  }

  onPasswordChange(e){
    var val = e.target.value;
    this.setState({password:val});
  }



  handleSubmit(e){
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password,
    }
    var headers = {
      'Access-Control-Allow-Origin': '*',
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    axios.post("http://localhost:8080/api/sign_in", data, {headers: headers})
      .then(res=>{
          localStorage.setItem(ACCESS_TOKEN, res.data.token);
          console.log(res.data);
          console.log(res.data.token);
          console.log("ACCESS TOKEN 11"+localStorage.getItem(ACCESS_TOKEN));
          axios.get("http://localhost:8080/api/current_user",{ headers: { Authorization:  'Bearer '+localStorage.getItem(ACCESS_TOKEN)}})
            .then(res=>{
              localStorage.setItem(CURRENT_ROLES, JSON.stringify(res.data.roles));
              localStorage.setItem(CURRENT_USER_ID, res.data.userId);
              console.log("USER ID "+localStorage.getItem(CURRENT_USER_ID));
              console.log("ROLES IN RES "+JSON.stringify(res.data.roles));
              console.log("ROLES "+localStorage.getItem(CURRENT_ROLES));
              console.log("TOKEN IN NESTED CALL "+localStorage.getItem(ACCESS_TOKEN));

            })
          this.props.history.push("/chattingroom");
      })
        .catch((error)=>{
        console.log("Error");
          this.setState({errorMessage:"Wrong email or password"})
      })
  }

  render(){
    return(
      <div>
        <Grid verticalAlign='middle' columns={1} centered>
          <Form className="signUpBox" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Email:</label>
              <input placeholder="Email" type="text" value={this.state.email} onChange={this.onEmailChange}/>
            </Form.Field>
            <Form.Field>
              <label>Password:</label>
              <input placeholder="Password" type="text" value={this.state.password} onChange={this.onPasswordChange}/>
            </Form.Field>
            <p>
              {this.state.errorMessage}
            </p>
            <p>
              <Link to='/signup'>Don't have account? Sign up!</Link>
            </p>
            <Button primary type="submit">
              Login
            </Button>
          </Form>
        </Grid>
      </div>
    )
  }

}

export default Login
