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
        currentUser={this.props.currentUser}
        friendOccasions={this.props.friendOccasions}
        userOccasions={this.props.userOccasions}
        deleteFriend={this.props.deleteFriend}
        getFriendOccasions={this.props.getFriendOccasions}
        toggleEdit={this.props.toggleEdit}
        editModal={this.props.editModal}
        findUntrackedOccasions={this.props.findUntrackedOccasions}
        />)
      }


      </ListGroup>

    )
  }
}
