import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class DetailGiftForm extends Component {
  state = {
    giftIdea: ""
  }
  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates an object out of entered interest, then posts to friend_interest table
  submitNewGift = (e) => {
    e.preventDefault()
    let obj = {
      friendId: this.props.friend.id,
      giftIdea: this.state.giftIdea
    }
    return this.props.saveFriendGift(obj)
      .then(() => this.props.findFriendGiftIdeas())

  }

  render() {
    return (
      <Modal isOpen={this.props.giftModal} toggleGift={this.props.toggleGift} className={this.props.className} >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.submitNewGift(e)
            this.props.toggleGift()
          }}
        >
          <ModalHeader toggleGift={this.props.toggleGift}>Add a Gift Idea</ModalHeader>
          <ModalBody id="addGiftForm">
            <FormGroup>
              <Input type="text" name="giftIdea" id="giftIdea" onChange={this.handleFieldChange} required /*defaultValue={this.props.name}*/ />
            </FormGroup>
            <FormGroup check>
              <Label htmlFor="purchased" check>
                <Input type="checkbox" value="purchased" />{' '}
                Purchased?
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" /*onSubmit={() => { }} */>Save</Button>
            <Button color="light" onClick={(e) => {
              this.props.toggleGift()
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
