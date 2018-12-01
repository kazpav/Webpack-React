import React from 'react';
import {Checkbox, Table} from 'semantic-ui-react';
import axios from 'axios';

class AllUsers extends React.Component{
  constructor(props) {
  super(props);

  this.state={
    users:[],
  }
  }

  componentDidMount(){
    console.log("componentDidMount ALLUSERS CALLED");
    axios.get('http://localhost:8080/users')
    .then(res => {
      const users = res.data;
      this.setState({users});
      console.log("AXIOS FROM ALLUSERS CALLED");
    })
  }


  render() {
    return (
      <div >
        <Table compact celled definnition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.users.map(user =>
              <Table.Row>
                <Table.Cell collapsing>
                  <Checkbox slider />
                </Table.Cell>
                <Table.Cell> {user.id} </Table.Cell>
                <Table.Cell> {user.name} </Table.Cell>
                <Table.Cell> {user.email} </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
          </Table>
      </div>
    );
  }
}
export default AllUsers
