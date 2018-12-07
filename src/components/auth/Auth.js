/*
  purpose: responsible for directing to login page or landing page depending on whether the user has logged in
*/

import React, { Component } from "react"
import GiftStorm from "./../GiftStorm"
import Login from "./Login"


export default class Auth extends Component {

  state = {
    auth: false
  }



  render() {
    return (
      <React.Fragment>
        {
          (this.state.auth === false)
            ? <Login auth={this.state.auth}/>
            : <GiftStorm auth={this.state.auth}/>
        }
      </React.Fragment>


    )
  }
}