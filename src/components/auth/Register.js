import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class FriendForm extends Component {

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <form
        // onSubmit={(e) => {
        //   e.preventDefault()
        //   this.props.buildNewEvent(e)
        // }
        // }
        >
          <ModalHeader toggle={this.props.toggle}>Register for Giftstorm</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Display Name</Label>
              <Input type="text" name="displayName" id="name" /*onChange={this.props.handleFieldChange}*/ required /*defaultValue={this.props.name}*/ />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" /*onChange={this.props.handleFieldChange}*/ required /*defaultValue={this.props.name}*/ />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="text" name="password" id="password" /*onChange={this.props.handleFieldChange}*/ required /*defaultValue={this.props.name}*/ />
            </FormGroup>
            <h5>Please select all occasions you'd like to track with GiftStorm</h5>
            <div >
              <FormGroup check>
                <Label htmlFor="birthday" check>
                  <Input type="checkbox" value="birthday" />{' '}
                  Birthdays
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label htmlFor="anniversary" check>
                  <Input type="checkbox" value="anniversary" />{' '}
                  Anniversaries
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Mother's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Father's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Valentine's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Christmas
              </Label>
              </FormGroup>
            </div>


          </ModalBody>
          <ModalFooter>
            <Button color="success" /*onSubmit={() => { }} */>Register</Button>
            <Button color="secondary" onClick={(e) => {
              this.props.toggle()
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
