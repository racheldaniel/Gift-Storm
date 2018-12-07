import React, { Component } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import "./Login.css"
import Register from "./Register"


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

  render() {
    return (
      <React.Fragment>
        <Form className="loginForm">
          <h1 className="text-center">Welcome to Giftstorm!</h1>
          <h5 className="text-center">Please Login to Begin Brainstorming</h5>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
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