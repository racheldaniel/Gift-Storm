import React, { Component } from 'react';
import { Container} from 'reactstrap';
import FriendList from "./FriendList"
import "./Friends.css"

export default class Friends extends Component{
  render () {
    return(
      <Container>
        <h1 className="text-center text-light my-5">Your Friends</h1>
        <FriendList/>

      </Container>

    )
  }
}