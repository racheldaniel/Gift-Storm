import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import "./App.css"
import Landing from "./landing/Landing"
import Friends from "./friends/Friends"
import FriendDetail from "./detail/Detail"


export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => {

          return <Landing {...props}
          currentUser={this.props.currentUser}
          />
        }} />
        <Route exact path="/friends" render={(props) => {

          return <Friends {...props}
          currentUser={this.props.currentUser}
          />
        }} />
        <Route path="/friends/:friendId(\d+)" render={(props) => {
          return <FriendDetail {...props}
          currentUser={this.props.currentUser}
          />
        }} />
      </Switch>

    )
  }
}


