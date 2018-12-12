import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FriendFormOptions from "./FriendFormOptions"
import API from "./../../modules/API/API"


export default class FriendForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendOccasions: [],
      name: ""
    };

    this.onCheckboxClick = this.onCheckboxClick.bind(this);
  }
  //function creates an array of all checked boxes by user_occasionId
  onCheckboxClick = (selected) => {
    const i = this.state.friendOccasions.indexOf(selected);
    if (i < 0) {
      this.state.friendOccasions.push(selected);
    } else {
      this.state.friendOccasions.splice(i, 1);
    }
  }

  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates a new friend object and posts, setting state of current friend to be used in posting friend occasions-- needs to be executed before function to post friend_occasions
  postNewFriend = () => {
    let obj = {
      name: this.state.name,
      userId: this.props.currentUser
    }
    return API.saveData(`friends`, obj)
      .then(() => API.getData(`friends`))
      .then((friends) => {
        let friendId = friends.find(friend =>
          friend.name === obj.name
        ).id
        this.setState({ friendId: friendId })
      })
  }


  //function iterates over friend occasions-- if it's a group holiday, use the date on the occasion table. If not, find key in state that corresponds to the user_occasionId and set its value as the date.

  postFriendOccasions = () => {
    let promises = []
    this.state.friendOccasions.forEach((friendOcc) => {
      let userOcc = this.props.userOccasions.find(occ =>
        occ.occasionId === friendOcc
      )
      console.log(userOcc)
      let obj
      if (userOcc.occasion.groupHoliday === "1") {
        obj = {
          user_occasionId: friendOcc,
          date: userOcc.occasion.date,
          friendId: this.state.friendId,
          giftStatus: 0
        }
      } else {
        let date = this.state[`${friendOcc}`]
        obj = {
          user_occasionId: friendOcc,
          date: date,
          friendId: this.state.friendId,
          giftStatus: 0
        }
      }
      promises.push(API.saveData(`friend_occasions`, obj))
    })
    return Promise.all(promises)
  }

  render() {
    return (
      <Modal isOpen={this.props.addModal} toggle={this.props.toggleAdd} className={this.props.className} >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.postNewFriend()
              .then(() => this.postFriendOccasions())
              .then(()=> this.props.getFriendOccasions(this.props.currentUser))
              .then(()=> this.props.getUserOccasions(this.props.currentUser))
              //TODO: render still isn't happening fast enough
              .then(()=> this.props.toggleAdd())

          }
          }
        >
          <ModalHeader toggle={this.props.toggleAdd}>Add a Friend</ModalHeader>
          <ModalBody id="addFriendForm">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" onChange={(e) => this.handleFieldChange(e)} required /*defaultValue={this.props.name}*/ />
            </FormGroup>
            <h5>What occasions will you be tracking for this Friend?</h5>
            <div >
              {
                this.props.userOccasions.map(occ =>
                  <FriendFormOptions
                    key={occ.id}
                    friendOccasions={this.state.friendOccasions}
                    onCheckboxClick={this.onCheckboxClick}
                    handleFieldChange={this.handleFieldChange}
                    occ={occ}
                  />
                )
              }

            </div>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" /*onSubmit={() => { }} */>Save</Button>
            <Button color="light" onClick={(e) => {
              this.props.toggleAdd()
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
