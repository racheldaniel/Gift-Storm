import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import validate from "./../../modules/User/Validate"


export default class FriendForm extends Component {
  state = {
    email: "",
    password: "",
    displayName: ""
  }
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  submitRegistration = (e) => {
    e.preventDefault()
    let obj = {
      email: this.state.email,
      password: this.state.password,
      displayName:this.state.displayName
    }
    //validate and submit
    validate.newUser(obj)
    .then(()=> this.props.loginSuccessful())



  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <form
        onSubmit={(e) => {
          e.preventDefault()
          this.submitRegistration(e)
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
              <Input type="email" name="email" id="email" onChange={this.handleFieldChange} required  />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" onChange={this.handleFieldChange} required  />
            </FormGroup>
            <h5>Please select all occasions you'd like to track with GiftStorm</h5>
            <div >
              <FormGroup check>
                <Label htmlFor="birthday" check>
                  <Input type="checkbox" value="birthday" />{' '}
                  Birthdays
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label htmlFor="anniversary" check>
                  <Input type="checkbox" value="anniversary" />{' '}
                  Anniversaries
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Mother's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Father's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Valentine's Day
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Christmas
              </Label>
              </FormGroup>
            </div>


          </ModalBody>
          <ModalFooter>
            <Button color="success" /*onSubmit={() => { }} */>Register</Button>
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
