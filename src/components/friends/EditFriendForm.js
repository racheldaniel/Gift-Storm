import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap';
import API from "./../../modules/API/API"
import EditFormTracked from "./EditFormTracked"
import EditFormUntracked from "./EditFormUntracked"


export default class EditFriendForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addOccasions: [],
      name: "",
      removeOccasions: []
    };

    this.onAddCheckboxClick = this.onAddCheckboxClick.bind(this);
  }
  //function creates an array of all checked boxes by user_occasionId
  onAddCheckboxClick = (selected) => {
    const i = this.state.addOccasions.indexOf(selected);
    if (i < 0) {
      this.state.addOccasions.push(selected);
    } else {
      this.state.addOccasions.splice(i, 1);
    }
  }

  onRemoveCheckboxClick = (friend_occasionId) => {
    const i = this.state.removeOccasions.indexOf(friend_occasionId);
    if (i < 0) {
      this.state.removeOccasions.push(friend_occasionId);
    } else {
      this.state.removeOccasions.splice(i, 1);
    }
   }


  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }



  //function iterates over addOccasions-- if it's a group holiday, use the date on the occasion table. If not, find key in state that corresponds to the user_occasionId and set its value as the date.

  postNewOccasions = () => {
    this.state.addOccasions.forEach((friendOcc) => {
      let userOcc = this.props.userOccasions.find(occ =>
        occ.occasionId === friendOcc
      )
      let obj
      if (userOcc.occasion.groupHoliday === "1") {
        obj = {
          user_occasionId: friendOcc,
          date: userOcc.occasion.date,
          friendId: this.props.currentlyEditing.id,
          giftStatus: 0
        }
      } else {
        let date = this.state[`${friendOcc}`]
        obj = {
          user_occasionId: friendOcc,
          date: date,
          friendId: this.props.currentlyEditing.id,
          giftStatus: 0
        }
      }
      return API.saveData(`friend_occasions`, obj)

    })
  }

  //function that iterates over removeOccasions (which contains friend_occasionIds) and deletes each
  deleteFriendOccasions = () => {
    this.state.removeOccasions.forEach((friend_occasionId)=> {
      return API.deleteData(`friend_occasions`, friend_occasionId)
    })
  }

  updateFriend = () => {
    let obj = {
      name: this.state.name,
    }
    return API.editData(`friends`, obj, this.props.currentlyEditing.id)
    .then(()=> this.deleteFriendOccasions())
    .then(()=> this.postNewOccasions())
    .then(()=> this.props.getFriendOccasions(this.props.currentUser))
  }

  render() {
    return (
      <Modal isOpen={this.props.editModal} toggle={this.props.toggleEdit} className={this.props.className} >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.updateFriend()
            .then(()=>this.props.toggleEdit(""))

          }
          }
        >
          <ModalHeader toggle={this.props.toggleEdit}>Edit Friend</ModalHeader>
          <ModalBody id="addFriendForm">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" required autoFocus
              onFocus={this.handleFieldChange}
              onChange={(e) => this.handleFieldChange(e)}
              defaultValue={this.props.currentlyEditing.name}
              />
            </FormGroup>
            <h5>{`Occasions You're Tracking For ${this.props.currentlyEditing.name}:`}</h5>
            <ListGroup>
            { (this.props.currentlyEditing !== "")
               ? this.props.currentlyEditing.friend_occasions.map(friendOcc =>
                    <EditFormTracked
                    key={friendOcc.id}
                    friendOcc={friendOcc}
                    userOccasions={this.props.userOccasions}
                    onRemoveCheckboxClick={this.onRemoveCheckboxClick}
                    />
                  )
                : null

              }
            </ListGroup>

            <h5>{`Occasions You Aren't Tracking:`}</h5>
            <div >
              {
                (this.props.currentlyEditing !== "")
                  ? this.props.notTracking.map(userOcc =>
                    <EditFormUntracked
                      key={userOcc.id}
                      userOcc={userOcc}
                      onAddCheckboxClick={this.onAddCheckboxClick}
                      handleFieldChange={this.handleFieldChange}
                    />
                    )
                  : null
              }

            </div>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onSubmit={() => { }} >Save</Button>
            <Button color="light" onClick={(e) => {
              this.props.toggleEdit("")
            }}
            >Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    )
  }
}
