import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "./Profile.css"
import API from "./../../modules/API/API"
export default class Profile extends Component {

  state = {
    user: [],
    occasionIds: [],
    displayName: "",
    email: "",
    password: "",
    addOccs: [],
    deleteOccs: [],
    isLoaded: false
  }

  /*
  Function fetches current user's info with associated occasions embedded.
  It then iterates over user occasions then pushes each occasion ID into an array.
  This array will be used to set default values and monitor what needs to be added/deleted from the user_occasion table
  */

  getUserAndOccasions = () => {
    API.getData(`users?id=${this.props.currentUser}&_embed=user_occasions`)
      .then((user) => {
        let occasionIds = []
        user[0].user_occasions.forEach((userOcc) => {
          occasionIds.push(userOcc.occasionId)
          this.setState({
            user: user,
            displayName: user[0].displayName,
            email: user[0].email,
            password: user[0].password,
            occasionIds: occasionIds,
            isLoaded: true

          })
        })
      })
  }

  /*
  Function handles checkbox clicks and creates arrays in state of occasions to be added and removed
  */

  onCheckboxClick = (occId) => {
    const occIndex = this.state.occasionIds.indexOf(occId);
    const addIndex = this.state.addOccs.indexOf(occId);
    const removeIndex = this.state.deleteOccs.indexOf(occId)

    if (occIndex < 0) {
      if (addIndex < 0) {
        this.state.addOccs.push(occId)
      } else {
        this.state.addOccs.splice(addIndex, 1)
      }
    } else {
      if (removeIndex < 0) {
        this.state.deleteOccs.push(occId)
      } else {
        this.state.deleteOccs.splice(removeIndex, 1)
      }
    }
  }

  //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  saveEditedProfile = () => {
    let promises = []
    let userObj = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password
    }
    promises.push(API.editData(`users`, userObj, this.props.currentUser))
    this.state.addOccs.forEach((occId) => {
      let occObj = {
        userId: this.props.currentUser,
        occasionId: occId
      }
      promises.push(API.saveData(`user_occasions`, occObj))
    })
    this.state.deleteOccs.forEach((occId) => {
      let userOcc = this.state.user[0].user_occasions.find(userOcc => userOcc.occasionId === occId)
      promises.push(API.deleteData(`user_occasions`, userOcc.id))
    })
    return Promise.all(promises)
  }

  componentDidMount() {
    this.getUserAndOccasions()
  }

  render() {

    return (
      <React.Fragment>
        {
          (this.state.isLoaded)
            ? <Form id="editProfile"
              onSubmit={(e) => {
                e.preventDefault()
                this.saveEditedProfile()
                .then(()=> this.getUserAndOccasions())
                .then(() => this.props.history.push("/"))
                alert("Changes Saved!")
              }}
            >
              <FormGroup >
                <Label for="name">Display Name</Label>
                <Input type="text" name="displayName" id="displayName" onChange={this.handleFieldChange} required defaultValue={this.state.user[0].displayName} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" onChange={this.handleFieldChange} required
                  defaultValue={this.state.user[0].email} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" onChange={this.handleFieldChange} required defaultValue={this.state.user[0].password} />
              </FormGroup>
              <h5>Occasions You're Tracking With GiftStorm</h5>
              <div >
                <FormGroup check>
                  <Label htmlFor="birthday" check>
                    <Input type="checkbox" value="birthday" onClick={(() => this.onCheckboxClick(1))}
                      defaultChecked=
                      {
                        (this.state.occasionIds.includes(1))
                          ? true
                          : null
                      }
                    />{' '}
                    Christmas
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label htmlFor="anniversary" check>
                    <Input type="checkbox" value="anniversary" onClick={(() => this.onCheckboxClick(2))}
                      defaultChecked=
                      {
                        (this.state.occasionIds.includes(2))
                          ? true
                          : null
                      }
                    />{' '}
                    Birthdays
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" onClick={(() => this.onCheckboxClick(3))}
                      defaultChecked=
                      {
                        (this.state.occasionIds.includes(3))
                          ? true
                          : null
                      }
                    />{' '}
                    Anniversaries
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" onClick={(() => this.onCheckboxClick(4))}
                      defaultChecked=
                      {
                        (this.state.occasionIds.includes(4))
                          ? true
                          : null
                      }
                    />{' '}
                    Valentine's Day
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" onClick={(() => this.onCheckboxClick(5))}
                      defaultChecked=
                      {
                        (this.state.occasionIds.includes(5))
                          ? true
                          : null
                      }
                    />{' '}
                    Mother's Day
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" onClick={(() => this.onCheckboxClick(6))}
                      defaultChecked=
                      {
                        (this.state.occasionIds.includes(6))
                          ? true
                          : null
                      }
                    />{' '}
                    Father's Day
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" onClick={(() => this.onCheckboxClick(7))}
                      defaultChecked=
                      {
                        (this.state.occasionIds.includes(7))
                          ? true
                          : null
                      }
                    />{' '}
                    Boss's Day
                </Label>
                </FormGroup>
              </div>
              <div className="text-center"><Button color="primary" id="saveProfile">Save Changes</Button></div>
            </Form>
            : null
        }
      </React.Fragment>
    )
  }
}
