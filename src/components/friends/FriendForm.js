import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FriendFormOptions from "./FriendFormOptions"


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
          <ModalHeader toggle={this.props.toggle}>Add a Friend</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="eventName" id="name" /*onChange={this.props.handleFieldChange}*/ required /*defaultValue={this.props.name}*/ />
            </FormGroup>
            <h5>What occasions will you be tracking for this Friend?</h5>
            <div >
              <FriendFormOptions />
            </div>


          </ModalBody>
          <ModalFooter>
            <Button color="success" /*onSubmit={() => { }} */>Save</Button>
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
