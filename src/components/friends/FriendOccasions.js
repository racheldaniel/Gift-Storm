import React, { Component } from 'react';
import { ListGroupItemText, Col } from 'reactstrap';


export default class FriendOccasions extends Component {


  render() {

    return (
      <React.Fragment>
        <Col className="text-center" >
          <img src={this.props.userOccasions.find(occ =>
            occ.occasionId === this.props.friend_occasion.user_occasionId
          ).occasion.img}

          alt={this.props.userOccasions.find(occ =>
            occ.occasionId === this.props.friend_occasion.user_occasionId
          ).occasion.name} className="img-thumbnail" />

          <ListGroupItemText>{this.props.friend_occasion.date}</ListGroupItemText>
        </Col>
      </React.Fragment>

    )
  }
}
