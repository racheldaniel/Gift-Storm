import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DetailGiftOptions from "./DetailGiftOptions"



export default class EditGiftForm extends Component {
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

  //function creates an object out of entered gift, then posts to friend_gift table
  editGift = (e, id) => {
    e.preventDefault()
    let obj = {
      friendId: this.props.friend.id,
      giftIdea: this.state.giftIdea
    }
    return this.props.editFriendGiftIdea(obj, id)
      .then(() => this.props.findFriendGiftIdeas())

  }

  //function builds an object out of the friend_occasionId and gift idea, then posts new entity to the gift table
  submitPurchasedGift = () => {

    //this part of the function uses the name of the occasion selected from the dropdown by the user, looks up that occasion ID, then finds the ID of the corresponding friend_occasion entity.
    let userOccId = this.props.userOccasions.find(occ =>
      occ.occasion.name === this.state.occasionName
    ).id
    let friendId = this.props.friend.id
    let friend_occasionId
    console.log(userOccId, friendId, this.props.friendOccGifts)
    this.props.friendOccGifts.forEach((occ) => {
      if (occ.user_occasionId === userOccId && occ.friendId === friendId) {
        friend_occasionId = occ.id
      }
    })
    let obj = {
      name: this.state.giftIdea,
      friend_occasionId: friend_occasionId
    }
    return this.props.savePurchasedGift(obj)
      .then(() => this.props.findFriendGiftIdeas())
      .then(() => this.props.findFriendGifts())


  }

  //function toggles the purchased state
  onCheckboxClick = () => {
    this.setState({ purchased: !this.state.purchased })
  }

  render() {
    return (
      <Modal isOpen={this.props.editGiftModal} toggle={this.props.toggleEditGiftIdea} className={this.props.className} >
        <form
          onSubmit={(e) => {
            e.preventDefault()
          /*if the purchased is false in the state of this component, execute the edit gift (patch) function.

          If purchased is true but no occasion has been selected, the user will be alerted.

          Otherwise, if purchased is true, that state will be set back to false, the gift will be removed from the gift idea list and added to the (purchased) gift table */

            if (this.state.purchased === false) {
              this.editGift(e, this.props.currentlyEditing.id)
              this.props.toggleEditGift("")
            } else {
              if (this.state.occasionName === "-Select-" || this.state.occasionName === "") {
                alert("Please Select an Occasion")
              } else {
                let id = this.props.currentlyEditing.id
                this.setState({ purchased: false })
                this.props.deleteFriendGiftIdea(id)

                  .then(() => this.submitPurchasedGift())

                this.props.toggleEditGiftIdea("")
              }
            }
          }}

        >
          <ModalHeader toggle={this.props.toggleEditGiftIdea}>Edit Gift Idea</ModalHeader>
          <ModalBody id="editGiftForm">
            <FormGroup>
              <Input type="text" name="giftIdea" id="giftIdea" required autoFocus
                onChange={this.handleFieldChange}
                onFocus={this.handleFieldChange}
                defaultValue={this.props.currentlyEditing.giftIdea} />
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
                    <Input type="select" name="occasionName" id="occasionName" onChange={this.handleFieldChange}>
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
            <Button color="primary" onSubmit={() => { }} >Save</Button>
            <Button color="light" onClick={(e) => {
              this.props.toggleEditGiftIdea("")
              if(this.state.purchased === true){
                this.setState({purchased: false})
              }
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
