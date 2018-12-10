import React, { Component } from 'react';
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class EditGiftForm extends Component {
  state = {
    giftIdea: this.props.currentlyEditing.giftIdea
  }
  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates an object out of entered gift, then posts to friend_gift table
  editGift = (e, id) => {
    e.preventDefault()
    let obj = {
      friendId: this.props.friend.id,
      giftIdea: this.state.giftIdea
    }
   return this.props.editFriendGift(obj, id)
    .then(()=>this.props.findFriendGiftIdeas())

  }

  render() {
    return (
      <Modal isOpen={this.props.editGiftModal} toggleEditGift={this.props.toggleEditGift} className={this.props.className} >
        <form
        onSubmit={(e) => {
          e.preventDefault()
          this.editGift(e, this.props.currentlyEditing.id)
          this.props.toggleEditGift("")
        }
        }
        >
          <ModalHeader toggleEditInterest={this.props.toggleInterest}>Edit Gift Idea</ModalHeader>
          <ModalBody id="editGiftForm">
            <FormGroup>
              <Input type="text" name="giftIdea" id="giftIdea" onChange={this.handleFieldChange} required defaultValue={this.props.currentlyEditing.giftIdea} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onSubmit={() => { }} >Save</Button>
            <Button color="light" onClick={(e) => {
              this.props.toggleEditGift("")
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
