import React from 'react'
import Messages from './Messages'
import Chats from './Chats'
import {Grid} from 'semantic-ui-react'

const ChattingRoom = () => (
  <Grid celled>
    <Grid.Column width={3}>
      <Chats />
    </Grid.Column>
    <Grid.Column width={9}>
      <Messages />
    </Grid.Column>
  </Grid>
)

export default ChattingRoom
