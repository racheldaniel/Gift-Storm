/*
  purpose: responsible for directing to login page or landing page depending on whether the user has logged in
*/

import React, { Component } from "react"
import GiftStorm from "./../GiftStorm"
import Login from "./Login"
import userSession from "../../modules/User/UserSession"


export default class Auth extends Component {

  state = {
    auth: false
  }

  loginSuccessful = () => {
     if (userSession.getUser()){
      this.setState({auth: true})
     }

  }

  componentDidMount() {
    this.loginSuccessful()
  }

  render() {
    return (
      <React.Fragment>
        {
          (this.state.auth === false)
            ? <Login auth={this.state.auth} loginSuccessful={this.loginSuccessful}/>
            : <GiftStorm auth={this.state.auth}/>
        }
      </React.Fragment>


    )
  }
}