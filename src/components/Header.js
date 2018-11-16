import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "semantic-ui-react";
// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/messages'>Messages</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
        <button className="ui buttons active">Button test</button>
      </ul>
    </nav>
  </header>
)

export default Header
