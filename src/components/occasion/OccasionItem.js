import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { ListGroupItem, ListGroupItemHeading, Row, Col, ListGroup } from 'reactstrap';
import inProgress from "./../../images/inProgress.png"
import complete from "./../../images/complete.png"
import OccasionGift from "./OccasionGift"
import moment from "moment"

export default class OccasionItem extends Component {
  render() {

    return (
      <React.Fragment>
        <ListGroupItem className="landingListItem">
          <Row>
            <Col xs={2} className="d-flex align-items-center  my-auto">
              <img src={this.props.userOcc.occasion.img} alt={this.props.userOcc.occasion.name} />
            </Col>
            {
              (this.props.userOcc.occasion.groupHoliday === "1")
                ? <Col xs={4} className="d-flex align-items-center text-center">
                  <h2>{this.props.friendOcc.friend.name}</h2>
                </Col>
                : <React.Fragment>
                  <Col xs={2} className="d-flex align-items-center text-center">
                    <h2>{this.props.friendOcc.friend.name}</h2>
                  </Col>
                  <Col xs={2} className="d-flex align-items-center text-center">
                    <h5>{moment(this.props.friendOcc.date).format("MMM Do")}</h5>
                  </Col>
                </React.Fragment>
            }
            <Col xs={4} className="d-flex align-items-center text-center" >

              <ListGroup>
                <ListGroupItemHeading>Purchased:</ListGroupItemHeading>
                {
                  this.props.friendOcc.gifts.map(gift =>
                    <OccasionGift
                      key={gift.id}
                      gift={gift}
                    />
                  )
                }
              </ListGroup>
            </Col>
            <Col xs={2} className="text-center my-auto">
              {
                (this.props.friendOcc.giftStatus === 1)
                  ? <img src={complete} alt="complete" />
                  : (this.props.friendOcc.giftStatus === 0 && this.props.friendOcc.gifts.length > 0)
                    ? <img src={inProgress} alt="inProgress" />
                    : null
              }
              <Link className="nav-link" to={`/friends/${this.props.friendOcc.friendId}`}>Details</Link>
            </Col>
          </Row>

        </ListGroupItem>
      </React.Fragment>

    )
  }
}
