import React, { Component } from 'react';
import { Container } from 'reactstrap';
import LandingList from "./LandingList"
import "./Landing.css"
import API from "./../../modules/API/API"
import moment from "moment"

export default class Landing extends Component {
  state = {
    friendOccasions: [],
    userOccasions: [],
    friends: [],
    isLoaded: false,
    currentDate: ""
  }

  setCurrentDate = () => {
    let currentDate = new Date()
    return this.setState({ currentDate: moment(currentDate).format('l') })
  }

  //this function will get all friend occasions, then change the date to reflect current or upcoming year depending on whether the date has already passed. Method to reset date pulled from the following post: https://stackoverflow.com/a/20409421

  getFriendOccasions = (currentUser) => {
    return API.getData(`friend_occasions?userId=${currentUser}&_embed=gifts`)
      .then((friendOccasions) => {
        friendOccasions.forEach((friendOcc, i)=> {
          let date = friendOcc.date.split("-")
          let currentYear = new Date().getFullYear()
          let newDate = new Date(currentYear, date[1] - 1, date[2])
          let today = new Date().valueOf()
          if(newDate.valueOf() < today){
            newDate.setFullYear(currentYear + 1)
          }
          friendOcc.date = newDate

        })
        friendOccasions.sort((a, b) => a.date - b.date)
        this.setState({ friendOccasions: friendOccasions })
      })
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


  // Function iterates over friendOccasions and returns an array containing only those with unique user_occasion Id's
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
      .then(() => this.setCurrentDate())
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
