import React from 'react';
import  {Button, Form, Grid, Header}  from 'semantic-ui-react';
import axios from 'axios';
import './signUpStyles.css';
import { Redirect, Link } from 'react-router-dom'



class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
    this.state = {email: ""};
    this.state = {password: ""};
    this.state = {repeatPassword: ""};

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e) {
    var val = e.target.value;
    this.setState({name: val});
this.setState({email: val});
this.setState({password: val});
this.setState({repeatPassword: val});

}
onNameChange(e){
var val = e.target.value;
this.setState({name:val});
}
onEmailChange(e){
var val = e.target.value;
this.setState({email:val});
}
onPasswordChange(e){
var val = e.target.value;
this.setState({password:val});
}
onRepeatPasswordChange(e){
var val = e.target.value;
this.setState({repeatPassword:val});
}


  handleSubmit(e) {
    e.preventDefault();
    // alert("Name: " + this.state.name);
    // alert("Email: " + this.state.email);
    // alert("Password: " + this.state.password);
    // alert("Repeat password: " + this.state.repeatPassword);
    var data ={
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
    }
     var headers = {
      'Access-Control-Allow-Origin': '*',
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    axios.post("http://localhost:8080/user", data, {headers:headers})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      this.setState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",

      });
  }

  render() {
    return (
      <div >

        <Grid verticalAlign='middle' columns={1} centered   >
          <Form onSubmit={this.handleSubmit} className="signUpBox">
            <Form.Field>
              <label>Name:</label>
              <input placeholder="Name" type="text" value={this.state.name} onChange={this.onNameChange}/>
            </Form.Field>
            <Form.Field>
              <label>Email:</label>
              <input placeholder="Email" type="text" value={this.state.email} onChange={this.onEmailChange}/>
            </Form.Field>
            <Form.Field>
              <label>Password:</label>
              <input placeholder="Password" type="text" value={this.state.password} onChange={this.onPasswordChange}/>
            </Form.Field>
            <Form.Field>
              <label>Repeat Password:</label>
              <input placeholder="Repeat Password" type="text" value={this.state.repeatPassword} onChange={this.onRepeatPasswordChange}/>
            </Form.Field>
            <p>
              <Link to='/login'>Have an account? Sing in!</Link>
            </p>
            <Button primary type="submit">
              Sign Up
            </Button>
          </Form>
        </Grid>
      </div>
    );
  }
}

export default SignUp
