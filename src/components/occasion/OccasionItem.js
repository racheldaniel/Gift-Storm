import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { ListGroupItem, ListGroupItemHeading, Row, Col, ListGroup } from 'reactstrap';
import inProgress from "./../../images/inProgress.png"
import OccasionGift from "./OccasionGift"

export default class OccasionItem extends Component {
  render() {

    return (
      <React.Fragment>
        <ListGroupItem className="landingListItem">
          <Row>
            <Col xs={2} className="d-flex align-items-center  my-auto">
              <img src={this.props.userOcc.occasion.img} alt={this.props.userOcc.occasion.name} />
            </Col>
            <Col xs={3} className="d-flex align-items-center text-center">
                  <h2>{this.props.friendOcc.friend.name}</h2>
            </Col>
            <Col xs={5} className="d-flex align-items-center text-center" >

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
            <img src={inProgress} alt="inProgress" className="img-thumbnail" />
              <Link className="nav-link" to={`/friends/${this.props.friendOcc.friendId}`}>Details</Link>
            </Col>
          </Row>

        </ListGroupItem>
      </React.Fragment>

    )
  }
}