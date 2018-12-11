import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import FriendList from "./FriendList"
import "./Friends.css"
import FriendForm from "./FriendForm"
import API from "./../../modules/API/API"

export default class Friends extends Component {
  state = {
    modal: false,
    friendOccasions: [],
    userOccasions: [],
    isLoaded: false
  }
  toggle = (e) => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  //this function will get all friends with their occasions embedded and set state in this component
  getFriendOccasions = (currentUser) => {
    return API.getData(`friends?userId=${currentUser}&_embed=friend_occasions`)
      .then((friendOccasions) => this.setState({ friendOccasions: friendOccasions }))
  }

  //this function will get all user occasions expanded with the occasion details , then set state in this component
  getUserOccasions = (currentUser) => {
    return API.getData(`user_occasions?userId=${currentUser}&_expand=occasion`)
      .then((userOccasions) => this.setState({ userOccasions: userOccasions, isLoaded: true }))
  }

  componentDidMount() {
    this.getFriendOccasions(this.props.currentUser)
      .then(() => this.getUserOccasions(this.props.currentUser))
  }

  render() {
    return (
     <React.Fragment>
        {
          (this.state.isLoaded === true)
            ?  <Container>
            <h1 className="text-center text-info my-4">Your Friends</h1>
            <div className="text-info text-center mt-4" ><Button className="text-info" color="primary" id="addEvent" onClick={(e) => {
              this.toggle()
            }}>Add A Friend</Button></div>
            <FriendForm
              toggle={this.toggle}
              modal={this.state.modal}
              userOccasions={this.state.userOccasions}
            />
            <FriendList friendOccasions={this.state.friendOccasions} userOccasions={this.state.userOccasions} />
            </Container>
            : null
        }
     </React.Fragment>




    )
  }
}