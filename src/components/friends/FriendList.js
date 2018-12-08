import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';
import FriendItem from "./FriendItem"

export default class FriendList extends Component{

  render () {
    return(
      <ListGroup className="upcoming">
      {
        this.props.friendOccasions.map(friend =>
        <FriendItem key={friend.id}
        friend={friend}
        friendOccasions={this.props.friendOccasions}
        userOccasions={this.props.userOccasions}/>)
      }


      </ListGroup>

    )
  }
}
