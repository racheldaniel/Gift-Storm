import React, { Component } from 'react';
import { ListGroupItem, ListGroup, Row, Col,
  ListGroupItemHeading, FormGroup, Label, Input } from 'reactstrap';
import anniversary from "./../../images/anniversary.png"
import complete from "./../../images/complete.png"
import DetailPurchased from "./DetailPurchased"


export default class DetailCelebrations extends Component {
  render() {
    return (
      <React.Fragment>
         <ListGroupItem className="landingListItem">
            <Row>
              <Col xs={1} className="d-flex align-items-center">
                <img src={anniversary} alt="Anniversary" className="img-thumbnail" />
              </Col>
              <Col xs={3} className="d-flex align-items-center text-center">
                <h3>Hannah's Anniversary</h3>

              </Col>
              <Col xs={1} className="d-flex align-items-center text-center" >

                <ListGroupItemHeading>12/31</ListGroupItemHeading>
              </Col>
              <Col xs={5} className="d-flex align-items-center text-center" >
                <ListGroup className="detailCard--ul">
                <ListGroupItemHeading>Purchased:</ListGroupItemHeading>
                  <DetailPurchased />
                </ListGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />{' '}
                    Complete
                  </Label>
                </FormGroup>
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
