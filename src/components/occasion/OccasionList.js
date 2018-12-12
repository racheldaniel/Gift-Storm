import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';
import OccasionItem from "./OccasionItem"

export default class OccasionList extends Component{
  render () {


    return(
      <ListGroup className="occasionFriends detailCard--ul">
      {
        this.props.friendOccasions.map(friendOcc =>
          <OccasionItem
          key={friendOcc.id}
          friendOcc={friendOcc}
          userOcc={this.props.userOcc}
          friends={this.props.friends}
          friendOccasions={this.props.friendOccasions}
          userOccasions={this.props.userOccasions}
          />
          )
      }


      </ListGroup>

    )
  }
}
