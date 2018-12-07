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
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

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
          <h1 className="text-center">Welcome to Giftstorm!</h1>
          <h5 className="text-center">Please Login to Begin Brainstorming</h5>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" onChange={this.handleFieldChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleFieldChange} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <div className="text-center registerButtonDiv">
          <Button onClick={(e) => {
            this.toggle()
          }}>New Here? Register Now!</Button>
        </div>
        <Register
          toggle={this.toggle}
          modal={this.state.modal}
        />

      </React.Fragment>


    )
  }
}