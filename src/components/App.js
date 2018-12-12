import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import "./App.css"
import Landing from "./landing/Landing"
import Friends from "./friends/Friends"
import FriendDetail from "./detail/Detail"
import API from "./../modules/API/API"
import Occasion from "./occasion/Occasion"


export default class App extends Component {
  state = {
    friends: [],
    userOccasions: [],
    isLoaded: false
  }

  findFriends = () => {
    return API.getData(`friends?userId=${this.props.currentUser}`)
      .then((friends) => this.setState({ friends: friends, isLoaded: true }))
  }

  //this function will get all user occasions expanded with the occasion details , then set state in this component
  getUserOccasions = (currentUser) => {
    return API.getData(`user_occasions?userId=${currentUser}&_expand=occasion`)
      .then((userOccasions) => this.setState({ userOccasions: userOccasions }))
  }

  componentDidMount() {
    this.getUserOccasions(this.props.currentUser)
      .then(() => this.findFriends())
  }

  render() {

    return (
      <Switch>

        <Route exact path="/" render={(props) => {
          if (this.state.isLoaded === true) {
            return <Landing {...props}
              currentUser={this.props.currentUser}
            />
          } else {
            return null
          }
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
        <Route path="/occasions/:user_occasionId(\d+)" render={(props) => {
          if (this.state.isLoaded === true) {
            return <Occasion {...props}
              currentUser={this.props.currentUser}
              friends={this.state.friends}
              userOccasions={this.state.userOccasions}
            />
          } else {
            return null
          }
        }} />
      </Switch>

    )
  }
}


