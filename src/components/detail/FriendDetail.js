import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';


export default class FriendDetail extends Component{
  render () {
    return(
      <ListGroup className="upcoming">
        <FriendItem />

      </ListGroup>

    )
  }
}