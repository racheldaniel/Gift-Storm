import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';


export default class DetailGiftOptions extends Component {


  render() {
    return (
      <React.Fragment>
        <option id={this.props.friendOcc.id}>{this.props.userOccasions.find(occ =>
          occ.occasionId === this.props.friendOcc.user_occasionId
        ).occasion.name}</option>
      </React.Fragment>
    )
  }
}