import React, { Component } from 'react';
import { Container, Button} from 'reactstrap';
import FriendList from "./FriendList"
import "./Friends.css"
import FriendForm from "./FriendForm"

export default class Friends extends Component{
  state = {
    modal: false
  }
  toggle = (e) => {
    this.setState({
      modal: !this.state.modal,
    })
  }
  render () {
    return(
      <Container>
        <h1 className="text-center text-light my-4">Your Friends</h1>
        <div className="text-light text-center mt-4" ><Button className="text-light" color="primary" id="addEvent" onClick={(e) => {
          this.toggle()
        }}>Add A Friend</Button></div>
        <FriendForm
        toggle={this.toggle}
        modal= {this.state.modal}
        />
        <FriendList/>

      </Container>

    )
  }
}