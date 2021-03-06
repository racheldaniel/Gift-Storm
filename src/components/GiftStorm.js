import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import App from "./App"

export default class GiftStorm extends Component {

  render() {
      return (
          <React.Fragment>
              <NavBar userName={this.props.userName}/>
              <App currentUser={this.props.currentUser}/>
          </React.Fragment>
      )
  }
}