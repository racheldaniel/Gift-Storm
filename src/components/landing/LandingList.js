import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';
import LandingItem from "./LandingItem"

export default class LandingList extends Component{
  render () {
    return(
      <ListGroup className="upcoming">
      {
        this.props.uniqueFriendOccs.map(friendOcc =>
          <LandingItem
          key={friendOcc.id}
          friendOcc={friendOcc}
          friends={this.props.friends}
          occasionGifts= {this.props.occasionGifts}
          friendOccasions={this.props.friendOccasions}
          uniqueFriendOccs={this.props.uniqueFriendOccs}
          userOccasions={this.props.userOccasions}
          statuses={this.props.statuses}
          />
          )
      }


      </ListGroup>

    )
  }
}
