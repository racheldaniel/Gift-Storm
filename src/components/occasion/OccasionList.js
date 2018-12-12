import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';
import OccasionItem from "./OccasionItem"

export default class OccasionList extends Component{
  render () {


    return(
      <ListGroup className="upcoming">
      {
        this.props.uniqueFriendOccs.map(friendOcc =>
          <OccasionItem
          key={friendOcc.id}
          friendOcc={friendOcc}
          friends={this.props.friends}
          uniqueFriendOccs={this.props.uniqueFriendOccs}
          userOccasions={this.props.userOccasions}
          />
          )
      }


      </ListGroup>

    )
  }
}
