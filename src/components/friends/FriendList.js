import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';
import FriendItem from "./FriendItem"

export default class FriendList extends Component{
  render () {
    return(
      <ListGroup className="upcoming">
        <FriendItem />

      </ListGroup>

    )
  }
}
