import React, { Component } from 'react';
import { ListGroup} from 'reactstrap';
import LandingItem from "./LandingItem"

export default class LandingList extends Component{
  render () {
    return(
      <ListGroup className="upcoming">
        <LandingItem />

      </ListGroup>

    )
  }
}
