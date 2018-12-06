import React, { Component } from 'react';
import {
  ListGroup, Container, Card, Row, Col, ListGroupItem, CardText, CardDeck,
  CardBody, Badge, CardHeader, ListGroupItemHeading, FormGroup, Label, Input
} from 'reactstrap';

import DetailInterests from "./DetailInterests"
import DetailGifts from "./DetailGifts"
import DetailCelebrations from "./DetailCelebrations"

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
                <DetailInterests />

              </CardText>
              <i className="icon-plus float-right "></i>
            </CardBody>
          </Card>

          <Card className="detailCard">
            <CardBody>
              <CardHeader className="detailCard--Heading text-center">Gift Ideas</CardHeader>
              <CardText className=" d-flex align-items-center flex-wrap">
                <ListGroup className="detailCard--ul">
                  <DetailGifts />
                </ListGroup>
              </CardText>
              <i className="icon-plus float-right "></i>
            </CardBody>
          </Card>
        </CardDeck>
        <ListGroup className="mt-5">
          <h3 className="text-center text-light">Celebrations</h3>
          <DetailCelebrations />
        </ListGroup>
      </Container>
    );
  }
}
