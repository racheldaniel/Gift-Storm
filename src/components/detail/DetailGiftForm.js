import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DetailGiftOptions from "./DetailGiftOptions"


export default class DetailGiftForm extends Component {
  state = {
    giftIdea: "",
    purchased: false,
    occasionName: ""
  }
  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates an object out of entered interest, then posts to friend_interest table
  submitGiftIdea = (e) => {
    e.preventDefault()
    let obj = {
      friendId: this.props.friend.id,
      giftIdea: this.state.giftIdea
    }
    return this.props.saveFriendGift(obj)
      .then(() => this.props.findFriendGiftIdeas())

  }

  submitPurchasedGift = (e) => {
    e.preventDefault()
    let occasionId = this.props.userOccasions.find(occ =>
      occ.occasion.name === this.state.occasionName
    ).occasionId
    let friendId = this.props.friend.id
    let friend_occasionId
    this.props.friendOccGifts.forEach((occ)=> {
      if(occ.user_occasionId === occasionId && occ.friendId === friendId) {
        friend_occasionId = occ.id
      }
    })
    let obj = {
      name: this.state.giftIdea,
      friend_occasionId: friend_occasionId
    }
    return this.props.savePurchasedGift(obj)
    .then(() => this.props.findFriendGifts())

  }

  onCheckboxClick = () => {
    this.setState({ purchased: !this.state.purchased })
  }

  render() {
    return (
      <Modal isOpen={this.props.giftModal} toggleGift={this.props.toggleGift} className={this.props.className} >
        <form
          onSubmit={(e) => {
            e.preventDefault()

              if(this.state.purchased === false){
                this.submitGiftIdea(e)
                this.props.toggleGift()
              } else {
                if (this.state.occasionName === "-Select-" || this.state.occasionName === ""){
                  alert("Please Select an Occasion")
                }else {
                  this.submitPurchasedGift(e)
                  this.props.toggleGift()
                }
              }
          }}
        >
          <ModalHeader toggleGift={this.props.toggleGift}>Add a Gift Idea</ModalHeader>
          <ModalBody id="addGiftForm">
            <FormGroup>
              <Input type="text" name="giftIdea" id="giftIdea" onChange={this.handleFieldChange} required />
            </FormGroup>
            <FormGroup check>
              <Label htmlFor="purchased" check>
                <Input type="checkbox" value="purchased" onClick={(() => this.onCheckboxClick())} />{' '}
                Purchased?
              </Label>
            </FormGroup>
            <FormGroup>

              {
                (this.state.purchased === true)
                  ?
                  <React.Fragment>
                    <Label htmlFor="occasionName">For:</Label>
                    <Input type="select" name="occasionName" id="occasionName" onChange={this.handleFieldChange} >
                      <option>-Select-</option>
                      {this.props.friendOccGifts.map(friendOcc =>
                        <DetailGiftOptions
                          key={friendOcc.id}
                          friendOcc={friendOcc}
                          userOccasions={this.props.userOccasions}
                        />
                      )}
                    </Input>


                  </React.Fragment>

                  : null
              }

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
