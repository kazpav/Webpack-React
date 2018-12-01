import React from 'react';
import {ACCESS_TOKEN, CURRENT_ROLES, CURRENT_USER_ID} from '../constants';
import {Button} from 'semantic-ui-react';
import {Link, Route , withRouter,hashHistory   } from 'react-router-dom';
import { browserHistory   } from 'react-router';
import Login from './Login';
import Main from './Main';

class Logout extends React.Component{
  constructor(props){
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e){
    localStorage.setItem(ACCESS_TOKEN, "");
    localStorage.setItem(CURRENT_ROLES, "");
    localStorage.setItem(CURRENT_USER_ID, "");
    console.log(" LOGOUT ONCLICK ACESS TOKEN: "+localStorage.getItem(ACCESS_TOKEN));
    console.log("LOGOUT ONCLICK ROLES: "+localStorage.getItem(CURRENT_ROLES));
    // this.props.history.push('/');
  }

  render(){
    return(
      <Link to="/login" onClick={this.onLogoutClick} role="button">Logout</Link>
    )
  }
}

export default Logout
