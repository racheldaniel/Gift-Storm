import React, { Component } from 'react';
import {
  ListGroup, Container, Card, Row, Col, ListGroupItem, CardText, CardDeck,
  CardBody, Badge, CardHeader, ListGroupItemHeading, FormGroup, Label, Input
} from 'reactstrap';
import anniversary from "./../../images/anniversary.png"
import complete from "./../../images/complete.png"
import christmas from "./../../images/christmas.png"
import inProgress from "./../../images/inProgress.png"
import "./Detail.css"

export default class FriendDetail extends Component {
  render() {
    return (
      <Container>
        <h1 className="text-center text-light my-5">Hannah's GiftStorm</h1>
        <CardDeck>
          <Card className="detailCard">
            <CardBody>
              <CardHeader className="detailCard--Heading text-center">Interests</CardHeader>
              <CardText className=" d-flex align-items-center flex-wrap text-center">
                <Badge className="mx-3 my-3 pill" color="warning" pill>Architecture</Badge>
                <Badge className="mx-3 my-3 pill" color="warning" pill>Norah</Badge>
                <Badge className="mx-3 my-3 pill" color="warning" pill>Needlepoint</Badge>
                <Badge className="mx-3 my-3 pill large" color="warning" pill>Hiking</Badge>
                <Badge className="mx-3 my-3 pill" color="warning" pill>Camping</Badge>
                <Badge className="mx-3 my-3 pill" color="warning" pill>Climbing</Badge>
                <Badge className="mx-3 my-3 pill large" color="warning" pill>Harry Potter</Badge>
                <Badge className="mx-3 my-3 pill" color="warning" pill>Reading</Badge>
                <Badge className="mx-3 my-3 pill" color="warning" pill>Running</Badge>

              </CardText>
              <i className="icon-plus float-right "></i>
            </CardBody>
          </Card>

          <Card className="detailCard">
            <CardBody>
              <CardHeader className="detailCard--Heading text-center">Gift Ideas</CardHeader>
              <CardText className=" d-flex align-items-center flex-wrap">
                <ListGroup className="detailCard--ul">
                  <ListGroupItem className="detailCard--li">Climbing Mat</ListGroupItem>
                  <ListGroupItem className="detailCard--li">Camping Coffee Pot</ListGroupItem>
                  <ListGroupItem className="detailCard--li">Running Shoes</ListGroupItem>
                </ListGroup>
              </CardText>
              <i className="icon-plus float-right "></i>
            </CardBody>
          </Card>
        </CardDeck>
        <ListGroup className="mt-5">
          <h3 className="text-center text-light">Celebrations</h3>
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
                  <ListGroupItem className="detailCard--li">Dobby Socks</ListGroupItem>
                  <ListGroupItem className="detailCard--li">Needlepoint Pattern Book</ListGroupItem>
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
          <ListGroupItem className="landingListItem">
            <Row>
              <Col xs={1} className="d-flex align-items-center">
                <img src={christmas} alt="christmas" className="img-thumbnail" />
              </Col>
              <Col xs={3} className="d-flex align-items-center text-center">
                <h3>Christmas</h3>

              </Col>
              <Col xs={1} className="d-flex align-items-center text-center" >

                <ListGroupItemHeading>12/25</ListGroupItemHeading>
              </Col>
              <Col xs={5} className="d-flex align-items-center text-center" >
                <ListGroup className="detailCard--ul">
                <ListGroupItemHeading>Purchased:</ListGroupItemHeading>
                  <ListGroupItem className="detailCard--li">Wand Makeup Brush</ListGroupItem>
                </ListGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />{' '}
                    Complete
                  </Label>
                </FormGroup>
              </Col>
              <Col xs={2} className=" my-auto text-center">
                <img src={inProgress} alt="inProgress" className="img-thumbnail" />
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Container>
    );
  }
}
