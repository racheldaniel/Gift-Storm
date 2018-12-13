import React, { Component } from 'react';
import { ListGroupItemText, Col } from 'reactstrap';
import moment from 'moment'

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
          <ListGroupItemText>{moment(this.props.friend_occasion.date).format("MMM Do")}</ListGroupItemText>
        </Col>
      </React.Fragment>

    )
  }
}
