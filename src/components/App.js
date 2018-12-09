import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import "./App.css"
import Landing from "./landing/Landing"
import Friends from "./friends/Friends"
import FriendDetail from "./detail/Detail"
import API from "./../modules/API/API"


export default class App extends Component {
  state = {
    friends: [],
    isLoaded: false
  }

  findFriends = () => {
    return API.getData(`friends?userId=${this.props.currentUser}`)
    .then((friends)=> this.setState({friends: friends, isLoaded: true}))
  }

  componentDidMount() {
    this.findFriends()
  }

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
          if (this.state.isLoaded === true) {
            return <FriendDetail {...props}
            currentUser={this.props.currentUser}
            friends={this.state.friends}
            />
          } else {
            return null
          }
        }} />
      </Switch>

    )
  }
}


