import React, { Component } from 'react';
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class DetailInterestForm extends Component {
  state = {
    interest: ""
  }
  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates an object out of entered interest, then posts to friend_interest table
  submitNewInterest = (e) => {
    e.preventDefault()
    let obj = {
      friendId: this.props.friend.id,
      interest: this.state.interest
    }
   return this.props.saveFriendInterest(obj)
    .then(()=>this.props.findFriendInterests())

  }

  render() {
    return (
      <Modal isOpen={this.props.interestModal} toggleInterest={this.props.toggleInterest} className={this.props.className} >
        <form
        onSubmit={(e) => {
          e.preventDefault()
          this.submitNewInterest(e)
          this.props.toggleInterest()
        }
        }
        >
          <ModalHeader toggleInterest={this.props.toggleInterest}>Add an Interest</ModalHeader>
          <ModalBody id="addInterestForm">
            <FormGroup>
              <Input type="text" name="interest" id="interest" onChange={this.handleFieldChange} required /*defaultValue={this.props.name}*/ />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onSubmit={() => { }} >Save</Button>
            <Button color="light" onClick={(e) => {
              this.props.toggleInterest()
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
