import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import validate from "./../../modules/User/Validate"
import API from "../../modules/API/API"
import userSession from "./../../modules/User/UserSession"

export default class FriendForm extends Component {
  state = {
    email: "",
    password: "",
    displayName: "",
    userOccasions: []
  }

  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates an object out of state (set by handleFieldChange) and passes that object to the validate module
  submitRegistration = (e) => {
    e.preventDefault()
    let obj = {
      email: this.state.email,
      password: this.state.password,
      displayName: this.state.displayName
    }
    //validate and submit
    return validate.newUser(obj)
      // .then(() => this.props.loginSuccessful())
  }

  //function creates an array of all checked boxes by id defined in boxes' onClick. These ids correspond to the ids in the occasions table
  onCheckboxClick = (selected) => {
    const i = this.state.userOccasions.indexOf(selected);
    if (i < 0) {
      this.state.userOccasions.push(selected);
    } else {
      this.state.userOccasions.splice(i, 1);
    }
  }

  //function iterates over the selected user occasions in state, creates an object out of each with the user id, and posts to the user-occasions table
  postUserOccasions = () => {
    let promises = []
    const currentUser = userSession.getUser()
    this.state.userOccasions.forEach((occasion) => {
      let obj = {
        userId: currentUser,
        occasionId: occasion
      }
      promises.push(API.saveData("user_occasions", obj))

    })
    return Promise.all(promises)
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.submitRegistration(e)
              .then(() => {
                this.postUserOccasions()
              })
          }
          }
        >
          <ModalHeader toggle={this.props.toggle}>Register for Giftstorm</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Display Name</Label>
              <Input type="text" name="displayName" id="name" onChange={this.handleFieldChange} required /*defaultValue={this.props.name}*/ />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" onChange={this.handleFieldChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" onChange={this.handleFieldChange} required />
            </FormGroup>
            <h5>Please select all occasions you'd like to track with GiftStorm</h5>
            <div >
              <FormGroup check>
                <Label htmlFor="birthday" check>
                  <Input type="checkbox" value="birthday" onClick={(() => this.onCheckboxClick(1))} />{' '}
                  Christmas
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label htmlFor="anniversary" check>
                  <Input type="checkbox" value="anniversary" onClick={(() => this.onCheckboxClick(2))} />{' '}
                  Birthdays
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onClick={(() => this.onCheckboxClick(3))} />{' '}
                  Anniversaries
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onClick={(() => this.onCheckboxClick(4))} />{' '}
                  Valentine's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onClick={(() => this.onCheckboxClick(5))} />{' '}
                  Mother's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onClick={(() => this.onCheckboxClick(6))} />{' '}
                  Father's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onClick={(() => this.onCheckboxClick(7))} />{' '}
                  Boss's Day
              </Label>
              </FormGroup>
            </div>


          </ModalBody>
          <ModalFooter>
            <Button color="success" onSubmit={() => { }} >Register</Button>
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
