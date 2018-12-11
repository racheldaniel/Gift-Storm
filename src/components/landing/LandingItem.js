import React, { Component } from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';
import inProgress from "./../../images/inProgress.png"

export default class LandingItem extends Component {
  render() {
    let userOcc = this.props.userOccasions.find(occ =>
      occ.occasionId === this.props.friendOcc.user_occasionId
    )

    let friend = this.props.friends.find(friend=>
        friend.id === this.props.friendOcc.friendId
      )

    return (
      <React.Fragment>
        <ListGroupItem className="landingListItem">
          <Row>
            <Col xs={3} className="d-flex align-items-center  my-auto">
              <img src={userOcc.occasion.img} alt={userOcc.occasion.name} className="img-thumbnail"/>
            </Col>
            <Col xs={4} className="d-flex align-items-center text-center">
              {
                (userOcc.occasion.groupHoliday === "1")
                ? <h2>{userOcc.occasion.name}</h2>
                :<h2>{`${friend.name}'s ${userOcc.occasion.name}`}</h2>
              }
            </Col>
            <Col xs={3} className="d-flex align-items-center text-center" >

              <ListGroupItemHeading>{this.props.friendOcc.date}</ListGroupItemHeading>
            </Col>
            <Col xs={2} className="text-center my-auto">
              <img src={inProgress} alt="inProgress" className="img-thumbnail" />
            </Col>
          </Row>

        </ListGroupItem>
      </React.Fragment>

    )
  }
}
