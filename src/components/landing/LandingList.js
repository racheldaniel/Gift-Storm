import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';
import LandingItem from "./LandingItem"

export default class LandingList extends Component{
  render () {
    return(
      <ListGroup className="upcoming">
      {
        this.props.uniqueFriendOccs.map(friendOcc =>
          <LandingItem {...this.props}
          key={friendOcc.id}
          friendOcc={friendOcc}

          />
          )
      }


      </ListGroup>

    )
  }
}
