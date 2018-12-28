import React, { Component } from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import moment from "moment"


export default class EditFormTracked extends Component {
  render() {
    let userOcc = this.props.userOccasions.find(occ =>
      occ.id === this.props.friendOcc.user_occasionId
    )
    return (
      <ListGroupItem>
        <Row>
          <Col sm={8}>
            <ListGroupItemHeading>{userOcc.occasion.name}</ListGroupItemHeading>
            <ListGroupItemText> {moment(this.props.friendOcc.date).format("MMMM Do")}
            </ListGroupItemText>
          </Col>
          <Col sm={4}>
            <FormGroup check>
              <Label htmlFor={userOcc.occasion.name} check>
                <Input type="checkbox" value={userOcc.occasion.name} onClick={(() =>
                  this.props.onRemoveCheckboxClick(this.props.friendOcc.id))} />{' '}
                Remove?
              </Label>
            </FormGroup>
          </Col>
        </Row>

      </ListGroupItem>
    )
  }
}