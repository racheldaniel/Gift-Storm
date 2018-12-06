import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import "./App.css"
import Landing from "./landing/Landing"
import Friends from "./friends/Friends"


export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => {

          return <Landing {...props}

          />
        }} />
        <Route exact path="/friends" render={(props) => {

          return <Friends {...props}

          />
        }} />
      </Switch>

    )
  }
}


