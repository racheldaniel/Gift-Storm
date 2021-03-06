/*
  purpose: responsible for directing to login page or landing page depending on whether the user has logged in
*/

import React, { Component } from "react"
import GiftStorm from "./../GiftStorm"
import Login from "./Login"
import userSession from "../../modules/User/UserSession"
import API from "../../modules/API/API"


export default class Auth extends Component {

  state = {
    auth: false,
    currentUser: "",
    userName: ""
  }

  loginSuccessful = () => {
    return new Promise((resolve)=>{
      const currentUser = userSession.getUser()
      if (currentUser){
        API.getData(`users/?id=${currentUser}`).then((user)=>{
          this.setState({auth: true, currentUser: currentUser, userName: user[0].displayName }, ()=> resolve())
        })

      }
    })

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
            : <GiftStorm auth={this.state.auth} currentUser={this.state.currentUser} redirectUser={this.redirectUser} userName={this.state.userName}/>
        }
      </React.Fragment>


    )
  }
}