import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { ListGroupItem, ListGroupItemHeading, Row, Col } from 'reactstrap';
import inProgress from "./../../images/inProgress.png"
import complete from "./../../images/complete.png"

export default class LandingItem extends Component {
  render() {
    let userOcc = this.props.userOccasions.find(occ =>
      occ.occasionId === this.props.friendOcc.user_occasionId
    )

    let friend = this.props.friends.find(friend =>
      friend.id === this.props.friendOcc.friendId
    )

    let status = this.props.statuses.find(status =>
      status[`${userOcc.id}`]
      )

    return (
      <React.Fragment>
        <ListGroupItem className="landingListItem">
          <Row>
            <Col xs={2} className="d-flex align-items-center  my-auto">
              <img src={userOcc.occasion.img} alt={userOcc.occasion.name} />
            </Col>
            <Col xs={4} className="d-flex align-items-center text-center">
              {
                (userOcc.occasion.groupHoliday === "1")
                  ? <h2>{userOcc.occasion.name}</h2>
                  : <h2>{`${friend.name}'s ${userOcc.occasion.name}`}</h2>
              }
            </Col>
            <Col xs={3} className="d-flex align-items-center text-center" >

              <ListGroupItemHeading>{this.props.friendOcc.date}</ListGroupItemHeading>
            </Col>
            <Col xs={3} className="text-center my-auto">
              {
                (userOcc.occasion.groupHoliday === "0" && this.props.friendOcc.giftStatus === 1)
                ||(userOcc.occasion.groupHoliday === "1" && status[`${userOcc.id}`] === "complete")
                ? <img src={complete} alt="complete"  />
                : (userOcc.occasion.groupHoliday === "0" && this.props.friendOcc.giftStatus === 0 && this.props.friendOcc.gifts.length > 0)
                ||(userOcc.occasion.groupHoliday === "1" && status[`${userOcc.id}`] === "inProgress")
                ? <img src={inProgress} alt="inProgress"  />
                : null
              }

              {
                (userOcc.occasion.groupHoliday === "0")
                  ? <Link className="nav-link" to={`/friends/${this.props.friendOcc.friendId}`}>Details</Link>

                  : <Link className="nav-link" to={`/occasions/${this.props.friendOcc.user_occasionId}`}>Details</Link>
              }

            </Col>
          </Row>

        </ListGroupItem>
      </React.Fragment>

    )
  }
}
