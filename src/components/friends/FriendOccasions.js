import React, { Component } from 'react';
import { ListGroupItemText, Col } from 'reactstrap';


export default class FriendOccasions extends Component {


  render() {
    let userOcc = this.props.userOccasions.find(occ =>
      occ.occasionId === this.props.friend_occasion.user_occasionId
    )

    return (
      <React.Fragment>
        <Col className="text-center" >
          <img src={userOcc.occasion.img}

          alt={userOcc.occasion.name} />
          <h5>{userOcc.occasion.name}</h5>
          <ListGroupItemText>{this.props.friend_occasion.date}</ListGroupItemText>
        </Col>
      </React.Fragment>

    )
  }
}
