import React, { Component } from 'react';
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class EditInterestForm extends Component {
  state = {
    interest: this.props.currentlyEditing.interest
  }
  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates an object out of entered interest, then posts to friend_interest table
  editInterest = (e, id) => {
    e.preventDefault()
    let obj = {
      friendId: this.props.friend.id,
      interest: this.state.interest
    }
   return this.props.editFriendInterest(obj, id)
    .then(()=>this.props.findFriendInterests())

  }

  render() {
    return (
      <Modal isOpen={this.props.editInterestModal} toggleEditInterest={this.props.toggleEditInterest} className={this.props.className} >
        <form
        onSubmit={(e) => {
          e.preventDefault()
          this.editInterest(e, this.props.currentlyEditing.id)
          this.props.toggleEditInterest("")
        }
        }
        >
          <ModalHeader toggleEditInterest={this.props.toggleInterest}>Edit Interest</ModalHeader>
          <ModalBody id="editInterestForm">
            <FormGroup>
              <Input type="text" name="interest" id="interest" onChange={this.handleFieldChange} required defaultValue={this.props.currentlyEditing.interest} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onSubmit={() => { }} >Save</Button>
            <Button color="light" onClick={(e) => {
              this.props.toggleEditInterest("")
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
