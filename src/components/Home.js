import React from 'react'
import {ACCESS_TOKEN, CURRENT_ROLES} from '../constants';


const Home = () => (
  <div>
    <h1>Welcome to Light Messenger!</h1>
    <p>{localStorage.getItem(CURRENT_ROLES).includes('"ROLE_ADMIN"') ? "Hi admin" : "No admin"} </p>
  </div>
)

export default Home
