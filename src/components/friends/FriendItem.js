import React, { Component } from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col , Button} from 'reactstrap';
import anniversary from "./../../images/anniversary.png"
import birthday from "./../../images/birthday.png"
import christmas from "./../../images/christmas.png"
import mothers from "./../../images/mothers.png"


export default class FriendItem extends Component {
  render() {
    return (
      <React.Fragment>
        <ListGroupItem className="friendListItem">
          <Row>
            <Col xs={2} className=" d-flex align-items-center text-center">
              <h3>Hannah </h3>

            </Col>
            <Col xs={2} className="text-center" >
              <img src={anniversary} alt="anniversary" className="img-thumbnail" />
              <ListGroupItemText>12/31</ListGroupItemText>
            </Col>
            <Col xs={2} className="text-center" >
              <img src={birthday} alt="birthday"  className="img-thumbnail" />
              <ListGroupItemText>5/10</ListGroupItemText>
            </Col>
            <Col xs={2} className="text-center" >
              <img src={christmas} alt="christmas" className="img-thumbnail"  />

            </Col>
            <Col xs={2} className="text-center" >
              <img src={mothers} alt="mothers" className="img-thumbnail" />

            </Col>
            <Col xs={2} className="text-center" >
              <Button className="btn-sm">Details</Button>

            </Col>

          </Row>

        </ListGroupItem>


      </React.Fragment>

    )
  }
}
