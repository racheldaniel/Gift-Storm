import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { ListGroupItem, ListGroupItemHeading, Row, Col } from 'reactstrap';
import inProgress from "./../../images/inProgress.png"
import complete from "./../../images/complete.png"
import noGifts from "./../../images/noGifts.png"
import moment from 'moment'


export default class LandingItem extends Component {
  render() {
    let userOcc = this.props.userOccasions.find(occ =>
      occ.id === this.props.friendOcc.user_occasionId
    )

    let friend = this.props.friends.find(friend =>
      friend.id === this.props.friendOcc.friendId
    )

    let prelimStatus = this.props.statuses.find(status =>
      status[`${userOcc.id}`]
    )

    let gifts = this.props.occasionGifts.find(occasion =>
      occasion.id === this.props.friendOcc.id).gifts

    let finalStatus

    let getStatus = () => {
      if ((userOcc.occasion.groupHoliday === "0" && this.props.friendOcc.giftStatus === 1)
      || (userOcc.occasion.groupHoliday === "1" && prelimStatus[`${userOcc.id}`] === "complete")){
        return finalStatus= "complete"
      } else if ((userOcc.occasion.groupHoliday === "0" && this.props.friendOcc.giftStatus === 0 && gifts.length > 0) || (userOcc.occasion.groupHoliday === "1" && prelimStatus[`${userOcc.id}`] === "inProgress")) {
        return finalStatus= "inProgress"
      } else {
        return finalStatus= "noGifts"
      }
    }

    getStatus()

    return (
      <React.Fragment>
        {
          (this.props.dropdownValue === "Filter") ||
          (this.props.dropdownValue === "All") ||
          (this.props.dropdownValue === "Giftless" && finalStatus === "noGifts") ||
          (this.props.dropdownValue === "In Progress" && finalStatus === "inProgress") ||
          (this.props.dropdownValue === "Complete" && finalStatus === "complete")
          ? <ListGroupItem className="landingListItem">
            <Row>
              <Col xs={2} className="d-flex align-items-center  my-auto">
                <img className="occIcon" src={userOcc.occasion.imgLg} alt={userOcc.occasion.name} />
              </Col>
              <Col xs={5} className="d-flex align-items-center text-center">
                {
                  (userOcc.occasion.groupHoliday === "1")
                    ? <h2>{userOcc.occasion.name}</h2>
                    : <h2>{`${friend.name}'s ${userOcc.occasion.name}`}</h2>
                }
              </Col>
              <Col xs={2} className="d-flex align-items-center text-center" >

                <ListGroupItemHeading>{moment(this.props.friendOcc.date).format("MMM Do")}</ListGroupItemHeading>
              </Col>
              <Col xs={3} className="text-center my-auto">
                {
                  (finalStatus === "complete")
                    ? <img src={complete} alt="complete" />
                    : (finalStatus === "inProgress")
                      ? <img src={inProgress} alt="inProgress" />
                      : <img src={noGifts} alt="noGifts" />
                }

                {
                  (userOcc.occasion.groupHoliday === "0")
                    ? <Link className="nav-link" to={`/friends/${this.props.friendOcc.friendId}`}>Details</Link>

                    : <Link className="nav-link" to={`/occasions/${this.props.friendOcc.user_occasionId}`}>Details</Link>
                }

              </Col>
            </Row>

          </ListGroupItem>
          : null
        }

      </React.Fragment>

    )
  }
}
