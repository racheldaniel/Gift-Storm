import React, { Component } from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';
import anniversary from "./../../images/anniversary.png"
import complete from "./../../images/complete.png"
import christmas from "./../../images/christmas.png"

export default class LandingItem extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="landingListItem">
          <Row>
            <Col xs={3} className="d-flex align-items-center  my-auto">
              <img src={christmas} alt="Anniversary" className="img-thumbnail"/>
            </Col>
            <Col xs={4} className="d-flex align-items-center text-center">
              <h2>CHRISTMAS</h2>

            </Col>
            <Col xs={3} className="d-flex align-items-center text-center" >

              <ListGroupItemHeading>12/25</ListGroupItemHeading>
            </Col>
            <Col xs={2} className="text-center my-auto">
              <img src={complete} alt="Complete" className="img-thumbnail" />
            </Col>
          </Row>

        </ListGroupItem>
        <ListGroupItem className="landingListItem">
          <Row>
            <Col xs={3} className="d-flex align-items-center">
              <img src={anniversary} alt="Anniversary" className="img-thumbnail"/>
            </Col>
            <Col xs={4} className="d-flex align-items-center text-center">
              <h3 >Hannah's Anniversary</h3>

            </Col>
            <Col xs={3} className="d-flex align-items-center text-center" >

              <ListGroupItemHeading>12/31</ListGroupItemHeading>
            </Col>
            <Col xs={2} className=" my-auto text-center">
              <img src={complete} alt="Complete" className="img-thumbnail" />
            </Col>
          </Row>

        </ListGroupItem>


      </React.Fragment>

    )
  }
}
