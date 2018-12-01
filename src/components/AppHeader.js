import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Header} from "semantic-ui-react";
import Logout from './Logout'
// The Header creates links that can be used to navigate
// between routes.
const AppHeader = () => (
  <header>

      <Header as='h1' block> Light messenger
        <Link to='/'>Home </Link>
        <Link to='/chattingroom'>Chatting Room </Link>
        <Link to='/signup'>Sign Up </Link>
        <Link to='/allusers'> All users </Link>
        <Link to='/login'>Login</Link>
        <Logout/>
      </Header>
  </header>
)

export default AppHeader
