import React, { Component } from 'react';
import { ListGroupItemText, Col } from 'reactstrap';
import moment from 'moment'
import "./Friends.css"

export default class FriendOccasions extends Component {


  render() {
    let userOcc = this.props.userOccasions.find(occ =>
      occ.id === this.props.friend_occasion.user_occasionId
    )
    return (
      <React.Fragment>
        <Col className="text-center" >
          <img className="occIcon" src={userOcc.occasion.imgLg}

          alt={userOcc.occasion.name} />
          <h5>{userOcc.occasion.name}</h5>
          <ListGroupItemText>{moment(this.props.friend_occasion.date).format("MMM Do")}</ListGroupItemText>
        </Col>
      </React.Fragment>

    )
  }
}
