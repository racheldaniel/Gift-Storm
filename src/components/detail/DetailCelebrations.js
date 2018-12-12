import React, { Component } from 'react';
import {
  ListGroupItem, ListGroup, Row, Col,
  ListGroupItemHeading, FormGroup, Label, Input
} from 'reactstrap';
import complete from "./../../images/complete.png"
import inProgress from "./../../images/inProgress.png"
import DetailPurchased from "./DetailPurchased"


export default class DetailCelebrations extends Component {
  render() {
    const userOcc = this.props.userOccasions.find(a => a.id === this.props.friendOcc.user_occasionId)

    return (
      <React.Fragment>
        <ListGroupItem className="landingListItem" >
          <Row>
            <Col xs={1} className="d-flex align-items-center">
              <img src={userOcc.occasion.img} alt={userOcc.occasion.name} />
            </Col>
            <Col xs={3} className="d-flex align-items-center text-center">
              {
                (userOcc.occasion.groupHoliday === "0")
                  ? <h3>{`${this.props.friend.name}'s ${userOcc.occasion.name}`}</h3>
                  : <h3>{`${userOcc.occasion.name}`}</h3>
              }

            </Col>
            <Col xs={1} className="d-flex align-items-center text-center" >

              <ListGroupItemHeading>{this.props.friendOcc.date}</ListGroupItemHeading>
            </Col>
            <Col xs={5} className="d-flex align-items-center text-center" >
              <ListGroup className="detailCard--ul">
                <ListGroupItemHeading>Purchased:</ListGroupItemHeading>
                  {
                  this.props.friendOcc.gifts.map((gift) =>
                    <DetailPurchased
                      key={gift.id}
                      gift={gift}
                    />
                  )
                }

              </ListGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onClick={()=> this.props.toggleGiftStatus(this.props.friendOcc.giftStatus, this.props.friendOcc.id)}
                  defaultChecked=
                  {
                    (this.props.friendOcc.giftStatus === 1)
                    ? true
                    : null
                  }
                  />{' '}
                  Complete
                  </Label>
              </FormGroup>
            </Col>
            <Col xs={2} className=" my-auto text-center">
                {
                  (this.props.friendOcc.giftStatus === 1)
                  ? <img src={complete} alt="Complete"  />
                  : (this.props.friendOcc.giftStatus === 0 && this.props.friendOcc.gifts.length > 0)
                  ?  <img src={inProgress} alt="inProgress"  />
                  : null
                }

            </Col>
          </Row>
        </ListGroupItem>
      </React.Fragment>

    )
  }
}
