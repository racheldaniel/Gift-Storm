import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import FriendList from "./FriendList"
import "./Friends.css"
import FriendForm from "./FriendForm"
import EditFriendForm from "./EditFriendForm"
import API from "./../../modules/API/API"

export default class Friends extends Component {
  state = {
    addModal: false,
    editModal: false,
    friendOccasions: [],
    userOccasions: [],
    isLoaded: false,
    currentlyEditing: "",
    notTracking: []
  }
  toggleAdd = (e) => {
    return this.setState({
      addModal: !this.state.addModal,
    })
  }

  toggleEdit = (friend) => {
    return new Promise((resolve) => {
      this.setState({
        editModal: !this.state.editModal,
        currentlyEditing: friend
      }, () => resolve())
    })
  }


  /*
  this function will get all friend occasions, then change the date to reflect current or upcoming year depending on whether the date has already passed. Method to reset date pulled from the following post: https://stackoverflow.com/a/20409421

  The function then sets state with both friend occasions and isLoaded
  */

 getFriendOccasions = (currentUser) => {
  return API.getData(`friends?userId=${currentUser}&_embed=friend_occasions`)
    .then((friends) => {
      friends.forEach((friend) => {
        friend.friend_occasions.forEach((friendOcc) => {
          let date = friendOcc.date.split("-")
          let currentYear = new Date().getFullYear()
          let newDate = new Date(currentYear, date[1] - 1, date[2])
          let today = new Date().valueOf()
          if(newDate.valueOf() < today){
            newDate.setFullYear(currentYear + 1)
          }
          friendOcc.date = newDate
        })
        friend.friend_occasions.sort((a, b) => a.date - b.date)
      })
      this.setState({ friendOccasions: friends, isLoaded: true })
    })
}


  //this function will get all user occasions expanded with the occasion details , then set state in this component
  getUserOccasions = (currentUser) => {
    return API.getData(`user_occasions?userId=${currentUser}&_expand=occasion`)
      .then((userOccasions) => this.setState({ userOccasions: userOccasions }))
  }

  componentDidMount() {
    this.getUserOccasions(this.props.currentUser)
      .then(() => this.getFriendOccasions(this.props.currentUser))
  }

  deleteFriend = (id) => {
    return API.deleteData(`friends`, id)
  }
  //function iterates over user occasions, then pushes all that aren't tracked for this friend into an array, then sets state
  findUntrackedOccasions = () => {
    let untrackedOccs = []
    this.state.userOccasions.forEach((userOcc) => {
      if (!this.state.currentlyEditing.friend_occasions.find(friendOcc =>
        friendOcc.user_occasionId === userOcc.id)) {
        untrackedOccs.push(userOcc)
      }
     return this.setState({notTracking: untrackedOccs})
    })
  }





  render() {
    return (
      <React.Fragment>
        {
          (this.state.isLoaded === true)
            ? <Container>
              <h1 className="text-center text-info my-4">Your Friends</h1>
              <div className="text-info text-center mt-4" ><Button className="text-info" color="primary" id="addEvent" onClick={(e) => {
                this.toggleAdd()
              }}>Add A Friend</Button></div>
              <FriendForm
                toggleAdd={this.toggleAdd}
                addModal={this.state.addModal}
                userOccasions={this.state.userOccasions}
                currentUser={this.props.currentUser}
                getFriendOccasions={this.getFriendOccasions}
                getUserOccasions={this.getUserOccasions}
                findFriends={this.props.findFriends}

              />
              <FriendList
                currentUser={this.props.currentUser}
                friendOccasions={this.state.friendOccasions}
                userOccasions={this.state.userOccasions}
                deleteFriend={this.deleteFriend}
                getFriendOccasions={this.getFriendOccasions}
                toggleEdit={this.toggleEdit}
                editModal={this.state.editModal}
                findUntrackedOccasions={this.findUntrackedOccasions}
              />
              <EditFriendForm
                toggleEdit={this.toggleEdit}
                editModal={this.state.editModal}
                userOccasions={this.state.userOccasions}
                currentUser={this.props.currentUser}
                getFriendOccasions={this.getFriendOccasions}
                getUserOccasions={this.getUserOccasions}
                currentlyEditing={this.state.currentlyEditing}
                notTracking={this.state.notTracking}


              />
            </Container>
            : null
        }
      </React.Fragment>




    )
  }
}