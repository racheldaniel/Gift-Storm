import React, { Component } from 'react';
import { Container } from 'reactstrap';
import LandingList from "./LandingList"
import "./Landing.css"
import API from "./../../modules/API/API"

export default class Landing extends Component {
  state = {
    friendOccasions: [],
    userOccasions: [],
    friends: [],
    isLoaded: false
  }
  //this function will get all friend occasions in ascending order
  getFriendOccasions = (currentUser) => {
    return API.getData(`friend_occasions?userId=${currentUser}&_embed=gifts&_sort=date&_order=asc`)
      .then((friendOccasions) => this.setState({ friendOccasions: friendOccasions }))
  }

  //this function will get all friends for current user
  getFriends = (currentUser) => {
    return API.getData(`friends?userId=${currentUser}`)
      .then((friends) => this.setState({ friends: friends }))
  }
  //this function will get all user occasions expanded with the occasion details , then set state in this component
  getUserOccasions = (currentUser) => {
    return API.getData(`user_occasions?userId=${currentUser}&_expand=occasion`)
      .then((userOccasions) => this.setState({ userOccasions: userOccasions }))
  }

  //function iterates over userOccasions and creates an array of friend occasions with the corresponding user_occasionId.
  //It iterates over that new array and creates an object with a key of the user_occasionId and value of either complete, in progress, or null (depending on gifting status of all friend occasions for that user Occ).
  //Those objects are pushed into an array, which is used to set state. This will be used for icon generation in LandingItem

  setUserOccasionState = () => {
    let statuses = []
    let complete = true
    this.state.userOccasions.forEach((userOcc) => {
      let count = 0
      let obj = {}
      let friendOccs = this.state.friendOccasions.filter(friendOcc =>
        friendOcc.user_occasionId === userOcc.id
      )
      friendOccs.forEach((friendOcc) => {
        count += friendOcc.gifts.length
        if (friendOcc.giftStatus === 0){
          complete = false
        }
      })
      if(complete === true){
        obj[userOcc.id] = "complete"
      } else if (complete === false && count > 0){
        obj[userOcc.id] = "inProgress"
      } else {
        obj[userOcc.id] = "none"
      }
      statuses.push(obj)

    })
    return this.setState({statuses: statuses})
  }


  // Function iterates over friendOccasions and returns an array containing only those with unique user_occasion Id's-- this
  findUniqueOccasions = () => {
    let uniqueOccasions = []
    this.state.friendOccasions.forEach((friendOcc) => {
      let count = 0
      let userOcc = this.state.userOccasions.find(occ =>
        occ.occasionId === friendOcc.user_occasionId
      )
      uniqueOccasions.forEach((unique) => {
        if (unique.user_occasionId === friendOcc.user_occasionId && userOcc.occasion.groupHoliday === "1") {
          count += 1
        }
      })
      if (count === 0) {
        uniqueOccasions.push(friendOcc)
      }
    })
    return this.setState({ uniqueFriendOccs: uniqueOccasions, isLoaded: true })
  }

  componentDidMount() {
    this.getFriendOccasions(this.props.currentUser)
      .then(() => this.getFriends(this.props.currentUser))
      .then(() => this.getUserOccasions(this.props.currentUser))
      .then(() => this.setUserOccasionState())
      .then(() => this.findUniqueOccasions())

  }

  render() {
    return (
      <React.Fragment>
        {
          (this.state.isLoaded === true)
            ? <Container>
              <h1 className="text-center text-info my-5">Upcoming Celebrations</h1>
              <LandingList
                friends={this.state.friends}
                uniqueFriendOccs={this.state.uniqueFriendOccs}
                userOccasions={this.state.userOccasions}
                statuses={this.state.statuses}
              />
            </Container>
            : null
        }

      </React.Fragment>


    )
  }
}
