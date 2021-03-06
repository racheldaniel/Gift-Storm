import React, { Component } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import "./Login.css"
import Register from "./Register"
import validate from "./../../modules/User/Validate"


export default class Login extends Component {
  state = {
    email: "",
    password: "",
    modal: false
  }

  toggle = (e) => {
    this.setState({
      modal: !this.state.modal,
    })
  }

   //function uses ids of form fields as keys, creates an object with input as value, and sets state
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  //function creates an object out of entered email and password, validates using validate module, then calls function from Auth component that sets state
  submitLogin = (e) => {
    e.preventDefault()
    let obj = {
      email: this.state.email,
      password: this.state.password
    }
    //validate and submit
    validate.existingUser(obj)
    .then(()=> this.props.loginSuccessful())



  }


  render() {
    return (
      <React.Fragment>
        <Form className="loginForm" onSubmit={(e) => this.submitLogin(e)}>
          <h1 className="text-center">Welcome to GiftStorm!</h1>
          <p className="text-center">~Please Login to Begin Brainstorming~</p>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" onChange={this.handleFieldChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleFieldChange} />
          </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
        <div className="text-center registerButtonDiv">
          <Button color="primary" onClick={(e) => {
            this.toggle()
          }}>New Here? Register Now!</Button>
        </div>
        <Register
          toggle={this.toggle}
          modal={this.state.modal}
          auth={this.props.auth}
          loginSuccessful={this.props.loginSuccessful}
        />

      </React.Fragment>


    )
  }
}